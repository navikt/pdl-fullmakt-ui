import { all, call } from 'redux-saga/effects';
import { availabilitySaga } from './availability/availabilitySaga';

export function* configSaga() {
  yield all([call(availabilitySaga)]);
}
