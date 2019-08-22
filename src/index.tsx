import { ConnectedRouter } from 'connected-react-router';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import { appStart } from './app/actions';
import { history, store } from './createStore';
import IntlProvider from './IntlProvider';

import './index.less';

if (document.getElementById('pagewrapper')) {
    Modal.setAppElement('#pagewrapper');
} else {
    Modal.setAppElement('#app');
}

const rootElement = document.getElementById('app');

const renderApp = (Component: React.ComponentType<{}>) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <IntlProvider>
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                </IntlProvider>
            </Provider>
        </AppContainer>,
        rootElement
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NewApp = require('./App').default;
        renderApp(NewApp);
    });
}

store.dispatch(appStart());
