import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ToggelsTypeKeys, togglesHentFeilet, togglesHentOk } from './actions';
import { fetchToggles } from './api';

function* fetchTogglesSaga(): SagaIterator {
    try {
        const toggles = yield call(fetchToggles);
        yield put(togglesHentOk(toggles));
    } catch (err) {
        yield put(togglesHentFeilet());
    }
}

function* togglesSaga(): SagaIterator {
    yield takeEvery(ToggelsTypeKeys.HENT, fetchTogglesSaga);
}

export { fetchTogglesSaga, togglesSaga };
