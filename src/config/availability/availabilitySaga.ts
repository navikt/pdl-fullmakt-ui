import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { restGet } from '../../api';
import {
  getResourceAvailabilitySuccess,
  getResourceAvailabilityFailure
} from './availabilityActions';

function* getResourceAvailabilitySaga() {
  try {
    const res = yield call(restGet, '/internal/resources/availability');
    const json = yield res.json();

    if (res.ok) {
      yield put(getResourceAvailabilitySuccess(json));
    } else {
      yield put(getResourceAvailabilityFailure(json));
    }
  } catch (error) {
    yield put(
      getResourceAvailabilityFailure({
        message: 'En feil oppstod ved henting av tilgjengelige eksterne ressurser'
      })
    );
  }
}

function* pollAvailabilitySaga() {
  while (false) {
    yield call(getResourceAvailabilitySaga);
    yield call(delay, 60000);
  }
}

export function* availabilitySaga() {
  yield call(pollAvailabilitySaga);
}
