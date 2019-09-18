import React from 'react';
import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { lenker } from './FrontpageLenker';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';

const Frontpage = () => {
  document.title = 'Fullmakter - www.nav.no';
  return (
    <>
      <Header />
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>Fullmakter til NAV</Sidetittel>
            </div>
          </header>
          <div className="frontpage__content">
            {lenker.map((lenke, key) => (
              <LenkepanelBase
                key={key}
                border
                className="lenke__panel"
                href={lenke.lenke}
                linkCreator={props => {
                  return lenke.external ? (
                    <a href={lenke.lenke} className={props.className}>
                      {props.children}
                    </a>
                  ) : (
                    <Link to={lenke.lenke} className={props.className}>
                      {props.children}
                    </Link>
                  );
                }}
              >
                <div className="lenke__container">
                  <div className="lenke__tittel">
                    <Undertittel className="lenkepanel__heading">
                      {lenke.tittel}
                    </Undertittel>
                  </div>
                  <div className="lenke__beskrivelse">
                    <Normaltekst>{lenke.beskrivelse}</Normaltekst>
                  </div>
                  <div className="lenke">
                    <Normaltekst>{lenke.lenkeTekst}</Normaltekst>
                  </div>
                </div>
              </LenkepanelBase>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Frontpage;
