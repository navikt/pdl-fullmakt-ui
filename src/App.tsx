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
  fetchEnheter
} from './clients/apiClient';
import { useStore } from './providers/Provider';
import { AuthInfo } from './types/authInfo';
import { HTTPError } from './components/error/Error';
import Fullmakt from './pages/fullmakt/Fullmakt';
import Login from './pages/fullmakt/Login';
import { KontaktInfo } from './types/kontaktInfo';
import { Fodselsnr } from './types/fodselsnr';
import ScrollToTop from './components/scroll-to-top/ScrollToTopp';
import { Enheter } from './types/enheter';
import { FullmaktType } from "./types/fullmakt";

export const baseUrl = '/person/pdl-fullmakt-ui';
const App = () => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (!auth.authenticated)
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: 'SETT_AUTH_RESULT', payload: authInfo });
          if (authInfo.authenticated) {
            fetchEnheter()
              .then((enheter: Enheter[]) => {
                dispatch({ type: 'SETT_ENHETER_RESULT', payload: enheter });
              })
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_ENHETER_ERROR', payload: error });
              });
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
            fetchFullmaktsgiver()
              .then((fullmaktsgiver: FullmaktType[]) =>
                dispatch({
                  type: 'SETT_FULLMAKTSGIVER',
                  payload: fullmaktsgiver
                })
              )
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_FULLMAKTSGIVER_ERROR', payload: error });
              });
            fetchFullmektig()
              .then((fullmektig: FullmaktType[]) =>
                dispatch({
                  type: 'SETT_FULLMEKTIG',
                  payload: fullmektig
                })
              )
              .catch((error: HTTPError) => {
                dispatch({ type: 'SETT_FULLMEKTIG_ERROR', payload: error });
              });
          }
        })
        .catch((error: HTTPError) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path={`(|${baseUrl})`} component={Frontpage} />
          <Route exact path={`${baseUrl}/fullmakt/login`} component={Login} />
          <Route exact path={`${baseUrl}/fullmakt`} component={Fullmakt} />
          <Route component={PageNotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
