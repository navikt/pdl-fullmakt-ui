import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { restGet, restPost, restPut, restDelete } from '../../api';
import { ApiPath } from './modelsApi';
import {
  fetchInformationType,
  fetchInformationTypeFailure,
  fetchInformationTypeSuccess,
  fetchPolicyForInformationType,
  fetchPolicyForInformationTypeSuccess,
  fetchPolicyForInformationTypeFailure,
  saveInformationType,
  saveInformationTypeSuccess,
  saveInformationTypeFailure,
  savePolicy,
  savePolicySuccess,
  savePolicyFailure,
  deletePolicy,
  deletePolicySuccess,
  deletePolicyFailure,
  deleteInformationType,
  deleteInformationTypeSuccess,
  deleteInformationTypeFailure
} from './actions';
import { DataActionTypes } from './types';

function* fetchInformationTypeSaga(action: ReturnType<typeof fetchInformationType>) {
  try {
    const query = Object.freeze(action.payload.query);

    const url = ApiPath.InformationTypePath;
    // 'http://localhost:8080/api/v1/*'
    // const res = yield call(restGet, 'http://localhost:8080' + url);
    //  const res = yield call(restGet, 'https://107.178.240.63' + url);
    // const res = yield call(restGet, 'https://35.201.118.102' + url, null, query);
    const res = yield call(restGet, url, null, query);
    const json = yield res.json();

    if (res.ok) {
      yield put(fetchInformationTypeSuccess(json, query));
    } else {
      yield put(fetchInformationTypeFailure(json));
    }
  } catch (error) {
    yield put(fetchInformationTypeFailure(error));
  }
}

export function* getInformationTypeSaga() {
  yield all([
    takeEvery(DataActionTypes.FETCH_INFORMATION_TYPE_REQUEST, fetchInformationTypeSaga)
  ]);
}

function* fetchPolicyForInformationtypeSaga(
  action: ReturnType<typeof fetchPolicyForInformationType>
) {
  try {
    const query = Object.freeze(action.payload.query);

    const url = ApiPath.PolicyForInformationTypePath;
    const res = yield call(restGet, url, null, query);
    const json = yield res.json();

    if (res.ok) {
      yield put(
        fetchPolicyForInformationTypeSuccess(
          json,
          query,
          action.payload.informationTypeId
        )
      );
    } else {
      yield put(
        fetchPolicyForInformationTypeFailure(json, action.payload.informationTypeId)
      );
    }
  } catch (error) {
    yield put(
      fetchPolicyForInformationTypeFailure(error, action.payload.informationTypeId)
    );
  }
}

export function* policyForInformationTypeSaga() {
  yield all([
    takeEvery(
      DataActionTypes.FETCH_POLICY_FOR_INFORMATION_TYPE_REQUEST,
      fetchPolicyForInformationtypeSaga
    )
  ]);
}

function* saveInformationTypeSaga(action: ReturnType<typeof saveInformationType>) {
  try {
    const res = yield call(
      action.payload.informationType &&
        action.payload.informationType.informationTypeId &&
        action.payload.informationType.informationTypeId >= 0
        ? restPut
        : restPost,
      ApiPath.InformationTypePath,
      action.payload.informationType
    );
    const json = yield res.json();
    if (res.ok) {
      yield put(
        saveInformationTypeSuccess(json, action.payload.informationType.informationTypeId)
      );
    } else {
      yield put(
        saveInformationTypeFailure(
          yield res.json(),
          action.payload.informationType.informationTypeId
        )
      );
    }
  } catch (error) {
    yield put(
      saveInformationTypeFailure(error, action.payload.informationType.informationTypeId)
    );
  }
}

export function* createInformationTypeSaga() {
  yield all([
    takeLatest(DataActionTypes.SAVE_INFORMATION_TYPE_REQUEST, saveInformationTypeSaga)
  ]);
}

function* removeInformationTypeSaga(action: ReturnType<typeof deleteInformationType>) {
  try {
    const res = yield call(
      restDelete,
      ApiPath.InformationTypePath + '/' + action.payload.informationTypeId
    );
    const json = yield res.json();
    if (res.ok) {
      yield put(deleteInformationTypeSuccess(json, action.payload.informationTypeId));
    } else {
      yield put(
        deleteInformationTypeFailure(yield res.json(), action.payload.informationTypeId)
      );
    }
  } catch (error) {
    yield put(deleteInformationTypeFailure(error, action.payload.informationTypeId));
  }
}

export function* deleteInformationTypeSaga() {
  yield all([
    takeLatest(DataActionTypes.DELETE_INFORMATION_TYPE_REQUEST, removeInformationTypeSaga)
  ]);
}

function* savePolicySaga(action: ReturnType<typeof savePolicy>) {
  try {
    const res = yield call(
      action.payload.policy &&
        action.payload.policy.policyId &&
        action.payload.policy.policyId >= 0
        ? restPut
        : restPost,
      ApiPath.PolicyForInformationTypePath,
      action.payload.policy
    );
    const json = yield res.json();
    if (res.ok) {
      yield put(
        savePolicySuccess(json, action.payload.informationTypeId, action.payload.policyId)
      );
    } else {
      yield put(
        savePolicyFailure(
          yield res.json(),
          action.payload.informationTypeId,
          action.payload.policyId
        )
      );
    }
  } catch (error) {
    yield put(
      savePolicyFailure(error, action.payload.informationTypeId, action.payload.policyId)
    );
  }
}

export function* createPolicySaga() {
  yield all([takeLatest(DataActionTypes.SAVE_POLICY_REQUEST, savePolicySaga)]);
}

function* removePolicySaga(action: ReturnType<typeof deletePolicy>) {
  try {
    const res = yield call(
      restDelete,
      ApiPath.PolicyForInformationTypePath + '/' + action.payload.policyId
    );
    const json = yield res.json();
    if (res.ok) {
      yield put(
        deletePolicySuccess(
          json,
          action.payload.informationTypeId,
          action.payload.policyId
        )
      );
    } else {
      yield put(
        deletePolicyFailure(
          yield res.json(),
          action.payload.informationTypeId,
          action.payload.policyId
        )
      );
    }
  } catch (error) {
    yield put(
      deletePolicyFailure(
        error,
        action.payload.informationTypeId,
        action.payload.policyId
      )
    );
  }
}

export function* deletePolicySaga() {
  yield all([takeLatest(DataActionTypes.DELETE_POLICY_REQUEST, removePolicySaga)]);
}
