import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const history = createBrowserHistory({
    basename: '/',
});

function configureStore() {
    const saga = createSagaMiddleware();
    let middleware: any[] = [routerMiddleware(history), saga];

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger({
            collapsed: true,
        });
        middleware = [...middleware, logger];
    }
    const appliedMiddleware = applyMiddleware(...middleware);
    const createdStore = createStore(rootReducer(history), composeWithDevTools(appliedMiddleware));

    saga.run(rootSaga);

    return createdStore;
}

const store = configureStore();

export { history, store };
