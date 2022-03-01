const Environment = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      miljo: 'LOCAL',
      baseUrl: 'http://localhost:8080',
      appUrl: 'http://localhost:8080/person/pdl-fullmakt-ui',
      apiUrl: 'http://localhost:8080/person/pdl-fullmakt-api',
      personInfoApiUrl: 'http://localhost:8080/person/personopplysninger-api',
      tjenesteUrl: 'https://tjenester-q0.nav.no',
      loginUrl: 'http://localhost:8080/personbruker-api/local/cookie',
      logoutUrl: '#'
    };
  }
  if (window.location.hostname.indexOf('www-q0') > -1) {
    return {
      miljo: 'DEV',
      innloggingsstatusUrl: 'https://innloggingsstatus.dev.nav.no',
      baseUrl: 'https://www-q0.nav.no',
      appUrl: 'https://www-q0.nav.no/person/pdl-fullmakt-ui',
      apiUrl: 'https://www-q0.nav.no/person/pdl-fullmakt-api',
      personInfoApiUrl: 'https://www-q0.nav.no/person/personopplysninger-api',
      tjenesteUrl: 'https://tjenester-q0.nav.no',
      loginUrl: 'https://loginservice-q.nav.no/login',
      logoutUrl: 'https://loginservice-q.nav.no/slo'
    };
  }
  if (window.location.hostname.indexOf('www.dev') > -1) {
    return {
      miljo: 'DEV',
      innloggingsstatusUrl: 'https://innloggingsstatus.dev.nav.no',
      baseUrl: 'https://www.dev.nav.no',
      appUrl: 'https://www.dev.nav.no/person/pdl-fullmakt-ui',
      apiUrl: 'https://www.dev.nav.no/person/pdl-fullmakt-api',
      personInfoApiUrl: 'https://www.dev.nav.no/person/personopplysninger-api',
      tjenesteUrl: 'https://tjenester.dev.nav.no',
      loginUrl: 'https://loginservice-q.nav.no/login',
      logoutUrl: 'https://loginservice-q.nav.no/slo'
    };
  }
  return {
    miljo: 'PROD',
    innloggingsstatusUrl: 'https://www.nav.no',
    baseUrl: 'https://www.nav.no',
    appUrl: 'https://www.nav.no/person/pdl-fullmakt-ui',
    apiUrl: 'https://www.nav.no/person/pdl-fullmakt-api',
    personInfoApiUrl: 'https://www.nav.no/person/personopplysninger-api',
    tjenesteUrl: 'https://tjenester.nav.no',
    loginUrl: 'https://loginservice.nav.no/login',
    logoutUrl: 'https://loginservice.nav.no/slo'
  };
};

export default Environment;
