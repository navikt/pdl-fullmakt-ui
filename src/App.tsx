import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Frontpage from './pages/frontpage/Frontpage';
import PageNotFound from './pages/404/404';
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr,
  fetchFullmaktsgiver,
  fetchFullmektig,
  fetchNavn
} from './clients/apiClient';
import { useStore } from './providers/Provider';
import { AuthInfo } from './types/authInfo';
import { HTTPError } from './components/error/Error';
import Fullmakt from './pages/fullmakt/Fullmakt';
import { KontaktInfo } from './types/kontaktInfo';
import { Fodselsnr } from './types/fodselsnr';
import ScrollToTop from './components/scroll-to-top/ScrollToTopp';
import { FullmaktType } from './types/fullmakt';
import WithAuth from './providers/auth/Auth';
import { NavnType } from './types/navn';

export const baseUrl = '/person/pdl-fullmakt-ui';
const App = () => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (!(auth.status === 'RESULT' && auth.data.authenticated))
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: 'SETT_AUTH_RESULT', payload: authInfo });
          if (authInfo.authenticated) {
            fetchKontaktInfo()
              .then((kontaktInfo: KontaktInfo) =>
                dispatch({
                  type: 'SETT_KONTAKT_INFO_RESULT',
                  payload: kontaktInfo
                })
              )
              .catch((error: HTTPError) => console.error(error));
            fetchFodselsnr()
              .then((fodselsnr: Fodselsnr) =>
                dispatch({
                  type: 'SETT_FODSELSNR',
                  payload: fodselsnr
                })
              )
              .catch((error: HTTPError) => console.error(error));
            fetchFullmaktsgiver("12345678901")
              .then((fullmaktsgiver: FullmaktType[]) =>
                dispatch({
                  type: 'SETT_FULLMAKTSGIVER',
                  payload: fullmaktsgiver
                })
              )
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_FULLMAKTSGIVER_ERROR', payload: error });
              });
            fetchFullmektig("12345678901")
              .then((fullmektig: FullmaktType[]) =>
                dispatch({
                  type: 'SETT_FULLMEKTIG',
                  payload: fullmektig
                })
              )
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_FULLMEKTIG_ERROR', payload: error });
              });
            fetchNavn()
              .then((navn: NavnType[]) =>
                dispatch({
                  type: 'SETT_NAVN',
                  payload: navn
                })
              )
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_NAVN_ERROR', payload: error });
              });
          }
        })
        .catch((error: HTTPError) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <WithAuth>
        <ScrollToTop>
          <Switch>
            <Route exact path={`(|${baseUrl})`} component={Frontpage} />
            <Route exact path={`${baseUrl}/fullmakt`} component={Fullmakt} />
            <Route exact path={`${baseUrl}/fullmakt/:fullmaktId`} component={Fullmakt} />
            <Route component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      </WithAuth>
    </Router>
  );
};

export default App;
