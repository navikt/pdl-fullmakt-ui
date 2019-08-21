import { all, call } from 'redux-saga/effects';
import { configSaga } from '../config/configSaga';
import {
  getInformationTypeSaga,
  policyForInformationTypeSaga,
  createInformationTypeSaga,
  createPolicySaga,
  deleteInformationTypeSaga,
  deletePolicySaga
} from '../pages/fullmakt/saga';
import { getCodeListSaga } from '../pages/producers/saga';
import { getPolicySaga } from '../pages/accessPolicies/saga';

export function* rootSaga() {
  yield all([
    call(configSaga),
    call(getInformationTypeSaga),
    call(policyForInformationTypeSaga),
    call(createInformationTypeSaga),
    call(getCodeListSaga),
    call(getPolicySaga),
    call(createPolicySaga),
    call(deleteInformationTypeSaga),
    call(deletePolicySaga)
  ]);
}
