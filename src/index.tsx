import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
// import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AppContainer } from 'react-hot-loader';
import configStore from './configStore';
import { LanguageJson } from './language';
import { I18n } from 'react-i18nify';
import { loadLanguage } from './utils/language';
import { runWithAdal } from 'react-adal';
import { authContext } from './adal/adal';

const history = createBrowserHistory();
const store = configStore(history);
const rootElement = document.getElementById('root') as HTMLElement;

I18n.setTranslations(LanguageJson);
loadLanguage();

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </AppContainer>
    </Provider>,
    rootElement
  );
};

runWithAdal(
  authContext,
  () => {
    render(App);
  },
  false
);

// registerServiceWorker();
