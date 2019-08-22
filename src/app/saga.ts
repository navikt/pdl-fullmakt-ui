import Environment from '../Environment';

import { LOCATION_CHANGE, push, replace } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import {
    all,
    call,
    cancel,
    fork,
    put,
    race,
    select,
    take,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import { barnHent, BarnTypeKeys } from '../barn/actions';
import { selectBarn } from '../barn/selectors';
import { landHent, LandTypeKeys } from '../land/actions';
import { sokerHent, SokerTypeKeys } from '../soker/actions';
import { ISteg, stegConfig } from '../stegConfig';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { ToggelsTypeKeys, togglesHent } from '../toggles/actions';
import {
    appEndreStatus,
    appPingOk,
    appSettSprak,
    appSettSteg,
    AppTypeKeys,
    IAppGaaTilSteg,
    IAppSettSprak,
} from './actions';
import { pingBackend } from './api';
import { selectAppSteg } from './selectors';
import { AppStatus, ILocationChangeAction } from './types';

const redirectTilLogin = () => {
    window.location.href = Environment().loginUrl + '?redirect=' + window.location.href;
};

function* autentiserBruker(): SagaIterator {
    try {
        yield call(pingBackend);
        yield put(appPingOk());
    } catch (error) {
        if (error.response.status === 401) {
            yield call(redirectTilLogin);
        }
    }
}

function* forsteSidelastSaga(): SagaIterator {
    yield fork(autentiserBruker);
    yield take([AppTypeKeys.PING_OK]);
    yield put(togglesHent());
    yield take([ToggelsTypeKeys.HENT_FEILET, ToggelsTypeKeys.HENT_OK]);

    yield put(teksterHent());
    yield put(landHent());
    yield put(sokerHent());

    yield put(barnHent());
    yield all([
        take(TeksterTypeKeys.HENT_OK),
        take(LandTypeKeys.HENT_OK),
        take(SokerTypeKeys.HENT_OK),
        take(BarnTypeKeys.HENT_OK),
    ]);
    const barn = yield select(selectBarn);
    if (barn.length === 0) {
        yield put(appEndreStatus(AppStatus.FEILSITUASJON));
        yield put(push('/ingen-barn'));
    } else {
        yield put(appEndreStatus(AppStatus.KLAR));
    }
}

function* startAppSaga(): SagaIterator {
    yield put(appEndreStatus(AppStatus.STARTER));
    const startSaga = yield fork(forsteSidelastSaga);
    const { fortrolig_adresse } = yield race({
        fortrolig_adresse: take([SokerTypeKeys.HENT_FORTROLIG_ADRESSE]),
        hentFeilet: take([
            TeksterTypeKeys.HENT_FEILET,
            LandTypeKeys.HENT_FEILET,
            SokerTypeKeys.HENT_FEILET,
            BarnTypeKeys.HENT_FEILET,
        ]),
    });
    yield cancel(startSaga);
    yield put(appEndreStatus(AppStatus.FEILSITUASJON));
    if (fortrolig_adresse) {
        yield put(push('/fortrolig-adresse'));
    } else {
        yield put(push('/feilside'));
    }
}

function* urlEndretSaga(action: ILocationChangeAction): SagaIterator {
    window.scrollTo(0, 0);
    const appSteg = yield select(selectAppSteg);
    const naavaerendeSide = Object.values(stegConfig).find(
        (side: ISteg) => side.path === action.payload.location.pathname
    );
    if (naavaerendeSide && naavaerendeSide.stegIndeks > appSteg) {
        const riktigSide = Object.values(stegConfig).find(
            (side: ISteg) => side.stegIndeks === appSteg
        );
        if (riktigSide) {
            yield put(replace(riktigSide.path));
        }
    } else if (naavaerendeSide && naavaerendeSide.stegIndeks < appSteg) {
        yield put(appSettSteg(naavaerendeSide.stegIndeks));
        yield put(replace(naavaerendeSide.path));
    }
}

function* tilStegSaga(steg: number) {
    const tilSide = Object.values(stegConfig).find((side: ISteg) => side.stegIndeks === steg);
    if (tilSide) {
        yield put(appSettSteg(steg));
        yield put(push(tilSide.path));
    }
}

function* nesteStegSaga(): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    yield call(tilStegSaga, appSteg + 1);
}

function* forrigeStegSaga(): SagaIterator {
    const appSteg = yield select(selectAppSteg);
    yield call(tilStegSaga, appSteg - 1);
}

function* gaaTilStegSaga(action: IAppGaaTilSteg): SagaIterator {
    yield call(tilStegSaga, action.steg);
}

function* settSprakSaga(action: IAppSettSprak) {
    yield put(appSettSprak(action.valgtSprak));
}

function* appSaga(): SagaIterator {
    yield takeLatest(AppTypeKeys.START_APP, startAppSaga);
    yield takeEvery(LOCATION_CHANGE, urlEndretSaga);
    yield takeEvery(AppTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(AppTypeKeys.FORRIGE_STEG, forrigeStegSaga);
    yield takeEvery(AppTypeKeys.GAA_TIL_STEG, gaaTilStegSaga);
    yield takeEvery(AppTypeKeys.VELG_SPRAK, settSprakSaga);
}

export { appSaga, forsteSidelastSaga, autentiserBruker, startAppSaga };
