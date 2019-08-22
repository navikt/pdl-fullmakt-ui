import { all } from 'redux-saga/effects';
import { appSaga } from './app/saga';
import { barnSaga } from './barn/saga';
import { innsendingSaga } from './innsending/saga';
import { landSaga } from './land/saga';
import { sokerSaga } from './soker/saga';
import { soknadSaga } from './soknad/saga';
import { teksterSaga } from './tekster/saga';
import { togglesSaga } from './toggles/saga';
import { vedleggSaga } from './vedlegg/saga';

function* rootSaga() {
    yield all([
        appSaga(),
        barnSaga(),
        landSaga(),
        sokerSaga(),
        teksterSaga(),
        togglesSaga(),
        innsendingSaga(),
        soknadSaga(),
        vedleggSaga(),
    ]);
}

export { rootSaga };
