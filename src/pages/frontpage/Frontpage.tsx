import React from 'react';
import { Normaltekst, Sidetittel, Undertittel, Element } from 'nav-frontend-typografi';
import { lenker } from './FrontpageLenker';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useStore } from '../../providers/Provider';
import { Knapp } from 'nav-frontend-knapper';
import endreIkon from '../../assets/Pencil.svg';
import slettIkon from '../../assets/Slett.svg';

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  const [{ fullmatsgiver, fullmektig }] = useStore();
  return (
    <>
      <Header />
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>NAV Fullmakter</Sidetittel>
            </div>
          </header>
          <div className="frontpage__content">
            <b>Fullmakter</b>
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
                          {f.fullmektigNavn || '' + ' (' + f.fullmektig + ')'}
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
                      <Knapp
                        type={'flat'}
                        htmlType={'button'}
                        className={'frontpage__knapp'}
                        onClick={e => e}
                      >
                        <>
                          <div className={'frontpage__knapp-tekst'}>endre</div>
                          <div className={'frontpage__knapp-ikon'}>
                            <img alt={'Endre telefonnummer'} src={endreIkon} />
                          </div>
                        </>
                      </Knapp>
                      <Knapp
                        type={'flat'}
                        htmlType={'button'}
                        className={'frontpage__knapp'}
                        autoDisableVedSpinner={true}
                        onClick={e => e}
                      >
                        <div className={'frontpage__knapp-tekst'}>slett</div>
                        <div className={'frontpage__knapp-ikon'}>
                          <img alt={'Slett telefonnummer'} src={slettIkon} />
                        </div>
                      </Knapp>
                    </div>
                  </div>

                  <div className="divider" />
                </>
              ))}
          </div>

          <div className="frontpage__content">
            <b>Fullmektig</b>
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
                          {f.fullmaktsgiverNavn || '' + ' (' + f.fullmaktsgiver + ')'}
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
