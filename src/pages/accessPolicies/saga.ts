import { all, call, put, takeEvery } from 'redux-saga/effects';

import { restGet } from '../../api';
import { ApiPath } from './modelsApi';
import { fetchPolicy, fetchPolicySuccess, fetchPolicyFailure } from './actions';
import { PolicyActionTypes } from './types';

function* fetchPolicySaga(action: ReturnType<typeof fetchPolicy>) {
  try {
    const res = yield call(restGet, ApiPath.PolicyPath);

    const json = yield res.json();

    if (res.ok) {
      yield put(fetchPolicySuccess(json));
    } else {
      yield put(fetchPolicyFailure(json));
    }
  } catch (error) {
    yield put(fetchPolicyFailure(error));
  }
}

export function* getPolicySaga() {
  yield all([takeEvery(PolicyActionTypes.FETCH_POLICY_REQUEST, fetchPolicySaga)]);
}
