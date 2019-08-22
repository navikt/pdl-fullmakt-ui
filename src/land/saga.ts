import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { landHentFeilet, landHentOk, LandTypeKeys } from './actions';
import { fetchLand } from './api';

function* fetchLandSaga(): SagaIterator {
    try {
        const land = yield call(fetchLand);
        yield put(landHentOk(land));
    } catch (err) {
        yield put(landHentFeilet());
    }
}

function* landSaga(): SagaIterator {
    yield takeEvery(LandTypeKeys.HENT, fetchLandSaga);
}

export { fetchLandSaga, landSaga };
