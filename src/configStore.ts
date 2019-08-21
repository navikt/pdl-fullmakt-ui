import { Store, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';

import { sortingAndPagingMiddleware } from './common/pagination/sortingAndPagingMiddleware';
import createRootReducer, { AppState } from './reducer';
import { rootSaga } from './saga';

export default function configureStore(history: History): Store<AppState> {
  const sagaMiddleware = createSagaMiddleware();
  const allMiddleware = [
    sortingAndPagingMiddleware,
    routerMiddleware(history),
    sagaMiddleware
  ];

  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(...allMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
