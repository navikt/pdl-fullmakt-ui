interface IEnvUrls {
    apiUrl: string;
    loginUrl: string;
    saksoversikt: string;
    papirsoknad: string;
}

const Environment = (): IEnvUrls => {
    if (process.env.NODE_ENV === 'development') {
        return {
            apiUrl: '/pdl-fullmakt-api/api',
            loginUrl: 'http://localhost:8080/local/cookie',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
        };
    } else if (window.location.hostname.indexOf('ci-test-server') > -1) {
        return {
            apiUrl: '/pdl-fullmakt-api/api',
            loginUrl: 'http://localhost:8080/local/cookie',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
        };
    } else if (window.location.hostname.indexOf('pdl-fullmakt-ui-t') > -1) {
        return {
            apiUrl: 'https://pdl-fullmakt-api-t.nav.no/api',
            loginUrl: 'https://loginservice-q.nav.no/login',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester-t11.nav.no/saksoversikt/app',
        };
    } else if (window.location.hostname.indexOf('pdl-fullmakt-ui-q') > -1) {
        return {
            apiUrl: 'https://pdl-fullmakt-api-q.nav.no/api',
            loginUrl: 'https://loginservice-q.nav.no/login',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester-q0.nav.no/saksoversikt/app',
        };
    }

    return {
        apiUrl: 'https://pdl-fullmakt-api.nav.no/api',
        loginUrl: 'https://loginservice.nav.no/login',
        papirsoknad:
            'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
        saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
    };
};

export default Environment;
