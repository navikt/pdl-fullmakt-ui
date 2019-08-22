import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { teksterHentFeilet, teksterHentOk, TeksterTypeKeys } from './actions';
import { fetchTekster } from './api';

function* fetchTeksterSaga(): SagaIterator {
    try {
        const tekster = yield call(fetchTekster);
        yield put(teksterHentOk(tekster));
    } catch (err) {
        yield put(teksterHentFeilet());
    }
}

function* teksterSaga(): SagaIterator {
    yield takeEvery(TeksterTypeKeys.HENT, fetchTeksterSaga);
}

export { fetchTeksterSaga, teksterSaga };
