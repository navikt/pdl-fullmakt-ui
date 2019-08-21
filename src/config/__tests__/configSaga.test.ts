import { expectSaga } from 'redux-saga-test-plan';

import { configSaga } from '../configSaga';
import { availabilitySaga } from '../availability/availabilitySaga';

describe('configSaga', () => {
  test('should call config sagas', () => {
    return expectSaga(configSaga)
      .call(availabilitySaga)
      .silentRun();
  });
});
