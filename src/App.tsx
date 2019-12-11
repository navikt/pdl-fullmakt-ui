import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Frontpage from './pages/frontpage/Frontpage';
import AlertStripe from 'nav-frontend-alertstriper';
import PageNotFound from './pages/404/404';
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr,
  fetchFullmaktsgiver,
  fetchFullmektig,
  fetchOmraade,
  fetchUnleash
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
import { Omraade } from './types/omraade';
import { transformData } from './utils/utils';
import { Unleash } from './types/unleash';

export const baseUrl = '/person/pdl-fullmakt-ui';
const App = () => {
  const [{ auth, unleash }, dispatch] = useStore();

  useEffect(() => {
    if (!(auth.status === 'RESULT' && auth.data.authenticated))
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: 'SETT_AUTH_RESULT', payload: authInfo });
          if (authInfo.authenticated) {
            fetchUnleash()
              .then((unleash: Unleash) => {
                dispatch({
                  type: 'SETT_UNLEASH',
                  payload: { unleash: unleash['pdl-fullmakt'] }
                });
              })
              .catch((error: HTTPError) => {
                console.error(error);
                dispatch({
                  type: 'SETT_UNLEASH',
                  payload: { unleash: false }
                });
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
              .then((fodselsnr: Fodselsnr) => {
                dispatch({
                  type: 'SETT_FODSELSNR',
                  payload: fodselsnr
                });
                fetchOmraade()
                  .then((omraade: Omraade[]) =>
                    dispatch({
                      type: 'SETT_OMRAADE',
                      payload: transformData(omraade)
                    })
                  )
                  .catch((error: HTTPError) => {
                    dispatch({ type: 'SETT_OMRAADE_ERROR', payload: error });
                  });
                fetchFullmaktsgiver(fodselsnr && fodselsnr.fodselsnr)
                  .then((fullmaktsgiver: FullmaktType[]) =>
                    dispatch({
                      type: 'SETT_FULLMAKTSGIVER',
                      payload: fullmaktsgiver
                    })
                  )
                  .catch((error: HTTPError) => {
                    dispatch({ type: 'SETT_FULLMAKTSGIVER_ERROR', payload: error });
                  });
                fetchFullmektig(fodselsnr && fodselsnr.fodselsnr)
                  .then((fullmektig: FullmaktType[]) =>
                    dispatch({
                      type: 'SETT_FULLMEKTIG',
                      payload: fullmektig
                    })
                  )
                  .catch((error: HTTPError) => {
                    dispatch({ type: 'SETT_FULLMEKTIG_ERROR', payload: error });
                  });
              })
              .catch((error: HTTPError) => console.error(error));
          }
        })
        .catch((error: HTTPError) => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!unleash &&
      auth.status === 'RESULT' &&
      auth.data.authenticated &&
      !(
        window.location.host.includes('localhost') // ||
        // window.location.host.includes('q0.nav.no')
      ) ? (
        <AlertStripe type='feil' style={{ marginTop: '10px' }}>
          Denne siden er dessverre ikke tilgjengelig for øyeblikket.
        </AlertStripe>
      ) : (
        <Router>
          <WithAuth>
            <ScrollToTop>
              <Switch>
                <Route exact path={`(|${baseUrl})`} component={Frontpage} />
                <Route exact path={`${baseUrl}/fullmakt`} component={Fullmakt} />
                <Route
                  exact
                  path={`${baseUrl}/fullmakt/:fullmaktId`}
                  component={Fullmakt}
                />
                <Route component={PageNotFound} />
              </Switch>
            </ScrollToTop>
          </WithAuth>
        </Router>
      )}
    </>
  );
};

export default App;
