import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { AppStatus } from '../app/types';
import {
    soknadErstattVedlegg,
    soknadFjernVedlegg,
    soknadLeggTilVedlegg,
    soknadSettFelt,
} from '../soknad/actions';
import { selectFelt } from '../soknad/selectors';
import { Feltnavn, IVedleggFelt, Stegnavn, ValideringsStatus } from '../soknad/types';
import { IVedleggLastOpp, VedleggTypeKeys } from './actions';
import { ILastOppVedleggRespons, lastOppVedlegg } from './api';
import { IVedlegg } from './types';

const SIZE_LIMIT = 20 * 1000 * 1000; // 20MB

enum Status {
    OK,
    VEDLEGG_FOR_STORT,
    SYSTEMFEIL,
    NETTVERKS_FEIL,
}

function* lastOppEnkeltVedleggSaga(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    fil: File
): SagaIterator {
    const tempRef = Math.random()
        .toString(36)
        .substring(7);

    const midlertidigVedlegg: IVedlegg = {
        fil,
        filnavn: '',
        filreferanse: tempRef,
        isLoading: true,
    };

    yield put(soknadLeggTilVedlegg(stegnavn, feltnavn, midlertidigVedlegg));

    try {
        if (fil.size > SIZE_LIMIT) {
            yield delay(2000);
            throw {
                response: {
                    status: 413,
                },
            };
        }

        const response: ILastOppVedleggRespons = yield call(lastOppVedlegg, fil);

        const oppdatertVedlegg: IVedlegg = {
            fil,
            filnavn: response.filnavn,
            filreferanse: response.vedleggsId,
            isLoading: false,
        };

        yield put(soknadErstattVedlegg(stegnavn, feltnavn, tempRef, oppdatertVedlegg));

        return Status.OK;
    } catch (e) {
        yield put(soknadFjernVedlegg(stegnavn, feltnavn, tempRef));

        if (!!e.response && e.response.status === 413) {
            return Status.VEDLEGG_FOR_STORT;
        }

        if (!!e.request && e.request.status === 0) {
            return Status.NETTVERKS_FEIL;
        }

        return Status.SYSTEMFEIL;
    }
}

function* lastOppVedleggSaga(action: IVedleggLastOpp): SagaIterator {
    const opplastingStatusForAlleVedlegg: Status[] = yield all(
        action.filer.map((fil: File) =>
            call(lastOppEnkeltVedleggSaga, action.stegnavn, action.feltnavn, fil)
        )
    );

    const fellesStatus = opplastingStatusForAlleVedlegg.reduce((acc, cur) => {
        if (acc === Status.SYSTEMFEIL || cur === Status.SYSTEMFEIL) {
            return Status.SYSTEMFEIL;
        } else if (acc === Status.NETTVERKS_FEIL || cur === Status.NETTVERKS_FEIL) {
            return Status.NETTVERKS_FEIL;
        } else if (acc === Status.VEDLEGG_FOR_STORT || cur === Status.VEDLEGG_FOR_STORT) {
            return Status.VEDLEGG_FOR_STORT;
        } else {
            return cur;
        }
    });

    const felt: IVedleggFelt = yield select(selectFelt, action.stegnavn, action.feltnavn);

    switch (fellesStatus) {
        case Status.SYSTEMFEIL:
            yield put(appEndreStatus(AppStatus.FEILSITUASJON));
            yield put(push('/vedlegg-opplasting-feilet'));
            break;
        case Status.NETTVERKS_FEIL:
            yield put(
                soknadSettFelt(action.stegnavn, action.feltnavn, {
                    ...felt,
                    feilmeldingsNokkel: 'feilmelding.generell.vedlegg.nettverk',
                    valideringsStatus: ValideringsStatus.ADVARSEL,
                })
            );
            break;
        case Status.VEDLEGG_FOR_STORT:
            yield put(
                soknadSettFelt(action.stegnavn, action.feltnavn, {
                    ...felt,
                    feilmeldingsNokkel: 'feilmelding.generell.vedlegg.forStort',
                    valideringsStatus: ValideringsStatus.ADVARSEL,
                })
            );
            break;
        case Status.OK:
            yield put(
                soknadSettFelt(action.stegnavn, action.feltnavn, {
                    ...felt,
                    feilmeldingsNokkel: '',
                    valideringsStatus: ValideringsStatus.OK,
                })
            );
            break;
    }
}

function* vedleggSaga(): SagaIterator {
    yield takeEvery(VedleggTypeKeys.LAST_OPP, lastOppVedleggSaga);
}

export { vedleggSaga, lastOppVedleggSaga, lastOppEnkeltVedleggSaga, Status };
