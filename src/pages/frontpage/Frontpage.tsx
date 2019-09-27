import React from 'react';
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

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  const [{ fullmatsgiver, fullmektig }] = useStore();
  return (
    <>
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>Dine fullmakter</Sidetittel>
            </div>
          </header>
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
                              onClick={e => e}
                            >
                              <EtikettLiten>Slett</EtikettLiten>
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
          </Box>
        </div>
      </div>
    </>
  );
};
export default Frontpage;
