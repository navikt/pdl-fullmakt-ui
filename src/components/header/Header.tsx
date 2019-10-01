import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Veileder from 'nav-frontend-veileder';
import VeilederIcon from '../../assets/Veileder.svg';
import { baseUrl } from '../../App';
import Error from '../../components/error/Error';

import { useStore } from '../../providers/Provider';

interface Props {
  title?: string;
}

const Header = (props: Props & RouteComponentProps) => {
  const [{ auth }] = useStore();

  switch (auth.status) {
    default:
    case 'LOADING':
      return <div>Loading...</div>;
    case 'RESULT':
      if (auth.data.authenticated) {
        return props.location.pathname === '/' || props.location.pathname === baseUrl ? (
          <div className="header header__frontpage">
            <div className="header__icon">
              <Veileder tekst="Hei! Velkommen til NAV fullmaktsløsning!" posisjon="topp">
                <img src={VeilederIcon} alt="Veileder" />
              </Veileder>
            </div>
          </div>
        ) : null;
      } else return null;
    case 'ERROR':
      return <Error error={auth.error} />;
  }
};
export default withRouter(Header);
