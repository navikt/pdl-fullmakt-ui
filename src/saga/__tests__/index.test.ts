import { expectSaga } from 'redux-saga-test-plan';

import { configSaga } from '../../config/configSaga';
import { rootSaga } from '../';

describe('saga index', () => {
  describe('rootSaga', () => {
    test('should call sagas', () =>
      expectSaga(rootSaga)
        .call(configSaga)
        .silentRun());
  });
});
