import { all, call, put, takeEvery } from 'redux-saga/effects';

import { restGet } from '../../api';
import { ApiPath } from './modelsApi';
import { fetchCodeList, fetchCodeListSuccess, fetchCodeListFailure } from './actions';
import { CodeListActionTypes } from './types';

const createObject = (obj: any) =>
  Object.entries(obj).map(value => ({ code: value[0], description: value[1] }));

function* fetchCodeListSaga(action: ReturnType<typeof fetchCodeList>) {
  try {
    const resProducer = yield call(restGet, ApiPath.CodeListProducerPath);
    const resCategory = yield call(restGet, ApiPath.CodeListCategoryPath);
    const resSystem = yield call(restGet, ApiPath.CodeListSystemPath);
    const resPurpose = yield call(restGet, ApiPath.CodeListPurposePath);

    const json = {
      producer: createObject(yield resProducer.json()),
      category: createObject(yield resCategory.json()),
      system: createObject(yield resSystem.json()),
      purpose: createObject(yield resPurpose.json())
    };

    if (resProducer.ok && resCategory.ok && resSystem.ok && resPurpose.ok) {
      yield put(fetchCodeListSuccess(json));
    } else {
      yield put(fetchCodeListFailure(json));
    }
  } catch (error) {
    yield put(fetchCodeListFailure(error));
  }
}

export function* getCodeListSaga() {
  yield all([takeEvery(CodeListActionTypes.FETCH_CODE_LIST_REQUEST, fetchCodeListSaga)]);
}
