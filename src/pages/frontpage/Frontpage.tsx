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
import { useHistory } from 'react-router-dom';
import { hentOmraadeDetaljer } from '../../utils/utils';
import { fullmaktSkjemaURL } from '../../utils/konstanter';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import Navigasjon from '../../components/Knapper/Navigering/Navigasjon';

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  const [{ fullmatsgiver, fullmektig, fodselsnr, omraade }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [slettId, setSlettId] = useState(-1);
  const [error, settError] = useState();
  const history = useHistory();
  const showOmraade = (o: string) =>
    o ? (o === '*' ? 'Alle områder' : 'Avgrenset til bestemte områder') : '';

  const showDetails = (omr: string) =>
    omr !== '*' && (
      <Lesmerpanel
        className={'frontpage__apne'}
        lukkTekst={'Lukk'}
        apneTekst={'vis detaljer'}
      >
        <div style={{ marginTop: 0 }}>
          Du kan finne detaljene om begrenset fullmakt informasjon nedenfor
          <div style={{ marginLeft: 20, marginTop: 0 }}>
            {omraade && omraade.status === 'RESULT' && omraade.data ? (
              hentOmraadeDetaljer(omraade.data, omr).map(o => <li key={o}>{o}</li>)
            ) : (
              <li key={omr}>{omr}</li>
            )}
          </div>
        </div>
      </Lesmerpanel>
    );

  const omraadeKomponent = (omraade: string) => (
    <div className={'frontpage__container'}>
      <div className={'frontpage__input-container'}>
        <Element>Fullmakten gjelder: &nbsp;</Element>
        {showOmraade(omraade)} &nbsp;
        {showDetails(omraade)}
      </div>
    </div>
  );

  const deletFullmakt = (e: any) => {
    e.preventDefault();
    setShowHide(false);
    slettId > 0 &&
      deleteFullmakt(String(slettId))
        .then((response: any) => {
          console.log(String(slettId) + ' is deleted with response = ', response);
          fetchFullmaktsgiver(fodselsnr)
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
  };
  return (
    <>
      <div className='pagecontent'>
        <div className='frontpage'>
          <header className='frontpage__introduksjon'>
            <div className='frontpage__sidetittel'>
              <Sidetittel>Dine fullmakter</Sidetittel>
            </div>
          </header>
          <br />
          <Veilederpanel
            svg={<img src={VeilederIcon} alt='Veileder' />}
            type={'plakat'}
            kompakt
          >
            Her kan du se en oversikt over hvem du har gitt fullmakt til, og hvem du er
            fullmektig for. Personer som du gir fullmakt til kan få innsyn i dine saker og
            ha dialog med NAV på vegne av deg. Les mer om fullmakt og innsyn{' '}
            <a className='lenke' href={fullmaktSkjemaURL}>
              her.
            </a>
          </Veilederpanel>
          <Navigasjon
            showHide={showHide}
            handleConfirm={(e: any) => deletFullmakt(e)}
            setShowHide={(e: boolean) => setShowHide(e)}
          />
          <Box id={'fullmaktFrontPage'} tittel={''} beskrivelse={''} icon={FullmaktIcon}>
            <div id='fullmaktPage'>
              <div key='Fullmakter' className='frontpage__content'>
                <Undertittel>Jeg har gitt fullmakt til:</Undertittel>
                <div className='divider' />
                {fullmatsgiver &&
                  fullmatsgiver.status === 'RESULT' &&
                  fullmatsgiver.data &&
                  fullmatsgiver.data.map((f, key) => (
                    <div key={f.fullmaktId}>
                      <div className='frontpage__container' key={f.fullmaktId}>
                        <div>
                          <div className='frontpage__input-container'>
                            <Element>Navn: &nbsp;</Element>
                            <Normaltekst>
                              {(f.fullmektigsNavn || '') + ' (' + f.fullmektig + ')'}
                            </Normaltekst>
                          </div>
                          <div className='frontpage__input-container'>
                            <Element>Gyldig: &nbsp;</Element>
                            <Normaltekst>
                              {getDefaultDateFormat(f.gyldigFraOgMed) +
                                ' - ' +
                                getDefaultDateFormat(f.gyldigTilOgMed)}
                            </Normaltekst>
                          </div>
                          {omraadeKomponent(f.omraade)}
                        </div>
                        <div className={'frontpage__knapper-container'}>
                          <div className={'frontpage__knapper'}>
                            <Knapp
                              type={'flat'}
                              htmlType={'button'}
                              className={'frontpage__knapp'}
                              onClick={() =>
                                history.push(
                                  `/person/pdl-fullmakt-ui/fullmakt/${f.fullmaktId}`
                                )
                              }
                            >
                              <>
                                <EtikettLiten>Endre</EtikettLiten>
                                <div className={'frontpage__knapp-ikon'}>
                                  <img alt={''} src={endreIkon} />
                                </div>
                              </>
                            </Knapp>
                            <div>
                              <Knapp
                                type={'flat'}
                                htmlType={'button'}
                                className={'frontpage__knapp'}
                                autoDisableVedSpinner={true}
                                onClick={e => {
                                  e.preventDefault();
                                  setSlettId(f.fullmaktId || -1);
                                  setShowHide(true);
                                }}
                              >
                                {loading ? (
                                  <NavFrontendSpinner type={'S'} />
                                ) : (
                                  <EtikettLiten>Avslutt fullmakten</EtikettLiten>
                                )}
                                <div className={'frontpage__knapp-ikon'}>
                                  <img alt={''} src={slettIkon} />
                                </div>
                              </Knapp>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div key={f.fullmaktId + 'divider'} className={'divider'} />
                    </div>
                  ))}
              </div>

              <div key={'FullmakterAdd'} className={'frontpage__container'}>
                <>&nbsp;</>
                <Knapp
                  type={'flat'}
                  htmlType={'button'}
                  className={'frontpage__knapp'}
                  autoDisableVedSpinner={true}
                  onClick={() => history.push('/person/pdl-fullmakt-ui/fullmakt')}
                >
                  <EtikettLiten>Ny fullmakt</EtikettLiten>
                  <div className={'frontpage__knapp-ikon'}>
                    <img alt={''} src={leggTilIkon} />
                  </div>
                </Knapp>
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
                              <Element>Gyldig: &nbsp;</Element>
                              <Normaltekst>
                                {getDefaultDateFormat(f.gyldigFraOgMed) +
                                  ' - ' +
                                  getDefaultDateFormat(f.gyldigTilOgMed)}
                              </Normaltekst>
                            </div>
                          </div>
                          {omraadeKomponent(f.omraade)}
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
