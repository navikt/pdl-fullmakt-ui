import React from 'react';
import {
  Normaltekst,
  Sidetittel,
  Undertittel,
  Element,
  EtikettLiten
} from 'nav-frontend-typografi';
import Header from '../../components/header/Header';
import { useStore } from '../../providers/Provider';
import { Knapp } from 'nav-frontend-knapper';
import endreIkon from '../../assets/Pencil.svg';
import slettIkon from '../../assets/Slett.svg';
import leggTilIkon from '../../assets/LeggTil.svg';

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  const [{ fullmatsgiver, fullmektig, auth }] = useStore();
  return (
    <>
      <Header />
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>NAV Fullmakter</Sidetittel>
              <Undertittel>{auth.authenticated ? ' for ' + auth.name : ''}</Undertittel>
            </div>
          </header>
          <div className="frontpage__content">
            <Undertittel>Fullmakter gitt</Undertittel>
            <div className="divider" />
            {fullmatsgiver &&
              fullmatsgiver.status === 'RESULT' &&
              fullmatsgiver.data &&
              fullmatsgiver.data.map((f, key) => (
                <>
                  <div className={'frontpage__container'} key="fullmakter">
                    <div>
                      <div className={'frontpage__input-container'}>
                        <Element>Navn: &nbsp;</Element>
                        <Normaltekst>
                          {(f.fullmektigNavn || '') + ' (' + f.fullmektig + ')'}
                        </Normaltekst>
                      </div>
                      <div className={'frontpage__container'}>
                        <div className={'frontpage__input-container'}>
                          <Element>Område: &nbsp;</Element>
                          <Normaltekst>{f.omraade}</Normaltekst>
                        </div>
                        <div className={'frontpage__input-container'}>
                          <Element>Gyldig: &nbsp;</Element>
                          <Normaltekst>
                            {f.gyldigFraOgMed + ' - ' + f.gyldigTilOgMed}
                          </Normaltekst>
                        </div>
                      </div>
                    </div>
                    <div className={'frontpage__knapper'}>
                      <a href={'/person/pdl-fullmakt-ui/fullmakt'}>
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

                  <div className="divider" />
                </>
              ))}
          </div>
          <div className={'frontpage__container'}>
            <>&nbsp;</>
            <a href={'/person/pdl-fullmakt-ui/fullmakt'}>
              <Knapp
                type={'flat'}
                htmlType={'button'}
                className={'frontpage__knapp'}
                autoDisableVedSpinner={true}
                onClick={e => e}
              >
                <EtikettLiten>Legg til</EtikettLiten>
                <div className={'frontpage__knapp-ikon'}>
                  <img alt={'Legg til fullmakt'} src={leggTilIkon} />
                </div>
              </Knapp>
            </a>
          </div>
          <div className="frontpage__content">
            <Undertittel>Fullmektig for</Undertittel>
            <div className="divider" />
            {fullmektig &&
              fullmektig.status === 'RESULT' &&
              fullmektig.data &&
              fullmektig.data.map((f, key) => (
                <>
                  <div className={'frontpage__container'} key="fullmektig">
                    <div>
                      <div className={'frontpage__input-container'}>
                        <Element>Navn: &nbsp;</Element>
                        <Normaltekst>
                          {(f.fullmaktsgiverNavn || '') + ' (' + f.fullmaktsgiver + ')'}
                        </Normaltekst>
                      </div>
                      <div className={'frontpage__container'}>
                        <div className={'frontpage__input-container'}>
                          <Element>Område: &nbsp;</Element>
                          <Normaltekst>{f.omraade}</Normaltekst>
                        </div>
                        <div className={'frontpage__input-container'}>
                          <Element>Gyldig: &nbsp;</Element>
                          <Normaltekst>
                            {f.gyldigFraOgMed + ' - ' + f.gyldigTilOgMed}
                          </Normaltekst>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Frontpage;
