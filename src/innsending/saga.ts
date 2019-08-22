import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { selectValgtSprak } from '../app/selectors';
import { AppStatus } from '../app/types';
import { selectSoknad } from '../soknad/selectors';
import { isIVedleggFelt } from '../soknad/types';
import { IVedlegg } from '../vedlegg/types';
import { InnsendingTypeKeys, sendInnFeilet, sendInnOk } from './actions';
import { sendInnSoknad } from './api';

function* mapStateToModel(): object {
    const soknad = yield select(selectSoknad);

    const strippetSoknad = Object.entries(soknad).reduce((acc: object, [stegKey, steg]) => {
        return {
            ...acc,
            [stegKey]: {
                ...Object.entries(steg).reduce((accFelt: object, [feltKey, felt]) => {
                    if (isIVedleggFelt(felt)) {
                        return {
                            ...accFelt,
                            [feltKey]: felt.verdi.map((v: IVedlegg) => ({
                                filnavn: v.filnavn,
                                filreferanse: v.filreferanse,
                            })),
                        };
                    }
                    return { ...accFelt, [feltKey]: felt.verdi };
                }, {}),
            },
        };
    }, {});

    const sprak = yield select(selectValgtSprak);
    return { ...strippetSoknad, sprak };
}

function* sendInnSaga(): SagaIterator {
    try {
        const soknad = yield call(mapStateToModel);
        const dato = yield call(sendInnSoknad, soknad);
        yield put(sendInnOk(dato));
        yield put(push('/kvittering'));
    } catch (error) {
        yield put(sendInnFeilet());
        yield put(appEndreStatus(AppStatus.FEILSITUASJON));
        yield put(push('/innsending-feilet'));
    }
}

function* innsendingSaga(): SagaIterator {
    yield takeEvery(InnsendingTypeKeys.SENDINN, sendInnSaga);
}

export { sendInnSaga, innsendingSaga };
