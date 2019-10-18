import React, { useState } from 'react';
import {
  Normaltekst,
  Sidetittel,
  Undertittel,
  Element,
  EtikettLiten
} from 'nav-frontend-typografi';
import { useStore } from '../../providers/Provider';
import { Knapp } from 'nav-frontend-knapper';
import endreIkon from '../../assets/Pencil.svg';
import slettIkon from '../../assets/Slett.svg';
import leggTilIkon from '../../assets/LeggTil.svg';
import Box from '../../components/box/Box';
import FullmaktIcon from '../../assets/Fullmakt.svg';
import { getDefaultDateFormat } from '../../components/felter/day-picker/utils';
import VeilederIcon from '../../assets/Veileder.svg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { deleteFullmakt, fetchFullmaktsgiver } from '../../clients/apiClient';
import { FullmaktType } from '../../types/fullmakt';
import { HTTPError } from '../../components/error/Error';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  const [{ fullmatsgiver, fullmektig }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();
  return (
    <>
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>Dine fullmakter</Sidetittel>
            </div>
          </header>
          <br />
          <Veilederpanel
            svg={<img src={VeilederIcon} alt="Veileder" />}
            type={'plakat'}
            kompakt
          >
            Her kan du se en oversikt over hvem du har gitt fullmakt til, og hvem du er
            fullmektig for. Personer som du gir fullmakt til kan få innsyn i dine saker og
            ha dialog med NAV på vegne av deg. Les mer om fullmakt og innsyn{' '}
            <a
              className="lenke"
              href="https://www.nav.no/no/NAV+og+samfunn/Samarbeid/Leger+og+andre+behandlere/annen-behandler/fullmakt-og-innsyn"
            >
              her.
            </a>
          </Veilederpanel>
          <Box
            id={'fullmaktFrontPage'}
            tittel={''}
            beskrivelse={
              '' /*'Fullmakter' + (auth.authenticated ? ' for ' + auth.name : '')*/
            }
            icon={FullmaktIcon}
          >
            <div id="fullmaktPage">
              <div key="Fullmakter" className="frontpage__content">
                <Undertittel>Jeg har gitt fullmakt til:</Undertittel>
                <div className="divider" />
                {fullmatsgiver &&
                  fullmatsgiver.status === 'RESULT' &&
                  fullmatsgiver.data &&
                  fullmatsgiver.data.map((f, key) => (
                    <div key={f.fullmaktId}>
                      <div className="frontpage__container" key={f.fullmaktId}>
                        <div>
                          <div className="frontpage__input-container">
                            <Element>Navn: &nbsp;</Element>
                            <Normaltekst>
                              {(f.fullmektigNavn || '') + ' (' + f.fullmektig + ')'}
                            </Normaltekst>
                          </div>
                          <div className="frontpage__container">
                            <div className="frontpage__input-container">
                              <Element>Fullmakten gjelder: &nbsp;</Element>
                              <Normaltekst>{f.omraade}</Normaltekst>
                            </div>
                            <div className="frontpage__input-container">
                              <Element>Gyldig: &nbsp;</Element>
                              <Normaltekst>
                                {getDefaultDateFormat(f.gyldigFraOgMed) +
                                  ' - ' +
                                  getDefaultDateFormat(f.gyldigTilOgMed)}
                              </Normaltekst>
                            </div>
                          </div>
                        </div>
                        <div className="frontpage__knapper">
                          <a href={'/person/pdl-fullmakt-ui/fullmakt/' + f.fullmaktId}>
                            <Knapp
                              type={'flat'}
                              htmlType={'button'}
                              className={'frontpage__knapp'}
                              onClick={e => e}
                            >
                              <>
                                <EtikettLiten>Endre</EtikettLiten>
                                <div className={'frontpage__knapp-ikon'}>
                                  <img alt={'Endre fullmakt'} src={endreIkon} />
                                </div>
                              </>
                            </Knapp>
                          </a>
                          <a href={'/person/pdl-fullmakt-ui'}>
                            <Knapp
                              type={'flat'}
                              htmlType={'button'}
                              className={'frontpage__knapp'}
                              autoDisableVedSpinner={true}
                              onClick={e => {
                                e.preventDefault();
                                return deleteFullmakt(String(f.fullmaktId))
                                  .then((response: any) => {
                                    fetchFullmaktsgiver('12345678901')
                                      .then((fullmaktsgiver: FullmaktType[]) =>
                                        dispatch({
                                          type: 'SETT_FULLMAKTSGIVER',
                                          payload: fullmaktsgiver
                                        })
                                      )
                                      .catch((error: HTTPError) => {
                                        dispatch({
                                          type: 'SETT_FULLMAKTSGIVER_ERROR',
                                          payload: error
                                        });
                                      });
                                  })
                                  .catch((error: HTTPError) => {
                                    settError(`${error.code} - ${error.text}`);
                                  })
                                  .then(() => {
                                    settLoading(false);
                                  });
                              }}
                            >
                              {loading ? (
                                <NavFrontendSpinner type={'S'} />
                              ) : (
                                <EtikettLiten>Slett</EtikettLiten>
                              )}
                              <div className={'frontpage__knapp-ikon'}>
                                <img alt={'Slett fullmakt'} src={slettIkon} />
                              </div>
                            </Knapp>
                          </a>
                        </div>
                      </div>
                      <div key={f.fullmaktId + 'divider'} className="divider" />
                    </div>
                  ))}
              </div>
              <div key={'FullmakterAdd'} className={'frontpage__container'}>
                <>&nbsp;</>
                <a href={'/person/pdl-fullmakt-ui/fullmakt'}>
                  <Knapp
                    type={'flat'}
                    htmlType={'button'}
                    className={'frontpage__knapp'}
                    autoDisableVedSpinner={true}
                    onClick={e => e}
                  >
                    <EtikettLiten>Ny fullmakt</EtikettLiten>
                    <div className={'frontpage__knapp-ikon'}>
                      <img alt={'Legg til fullmakt'} src={leggTilIkon} />
                    </div>
                  </Knapp>
                </a>
              </div>
              <div key={'Fullmektig'} className={'frontpage__content'}>
                <Undertittel>Jeg er fullmektig for:</Undertittel>
                <div className={'divider'} />
                {fullmektig &&
                  fullmektig.status === 'RESULT' &&
                  fullmektig.data &&
                  fullmektig.data.map((f, key) => (
                    <div key={f.fullmaktId}>
                      <div className={'frontpage__container'} key={f.fullmaktId}>
                        <div>
                          <div className={'frontpage__input-container'}>
                            <Element>Navn: &nbsp;</Element>
                            <Normaltekst>
                              {(f.fullmaktsgiverNavn || '') +
                                ' (' +
                                f.fullmaktsgiver +
                                ')'}
                            </Normaltekst>
                          </div>
                          <div className={'frontpage__container'}>
                            <div className={'frontpage__input-container'}>
                              <Element>Fullmakten gjelder: &nbsp;</Element>
                              <Normaltekst>{f.omraade}</Normaltekst>
                            </div>
                            <div className={'frontpage__input-container'}>
                              <Element>Gyldig: &nbsp;</Element>
                              <Normaltekst>
                                {getDefaultDateFormat(f.gyldigFraOgMed) +
                                  ' - ' +
                                  getDefaultDateFormat(f.gyldigTilOgMed)}
                              </Normaltekst>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div key={f.fullmaktId + 'divider'} className={'divider'} />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              {error && <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>}
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};
export default Frontpage;
