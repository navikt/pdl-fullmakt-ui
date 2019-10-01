import React from 'react';
import { useStore } from '../../providers/Provider';
import { baseUrl } from '../../App';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Redirect } from 'react-router-dom';
import Environment from '../../utils/Environments';
import Header from '../../components/header/Header';

const { loginUrl } = Environment();

const Login = () => {
  document.title = 'Login - www.nav.no';
  const [{ auth }] = useStore();

  if (auth.status === 'RESULT' && auth.data.authenticated) {
    return <Redirect to={`${baseUrl}/fullmakt`} />;
  }

  return (
    <>
      <Header title="Fullmakt på service" />
      <div className="pagecontent">
        <div className="fullmakt__login-content">
          <a href={`${loginUrl}?redirect=${window.location.href}`}>
            <Hovedknapp>Logg inn</Hovedknapp>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
