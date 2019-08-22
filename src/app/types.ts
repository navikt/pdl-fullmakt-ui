import { LOCATION_CHANGE, RouterState } from 'connected-react-router';

enum AppStatus {
    IKKE_STARTET = 'IKKE_STARTET',
    STARTER = 'STARTER',
    KLAR = 'KLAR',
    FEILSITUASJON = 'FEILSITUASJON',
    SENDT_INN = 'SENDT_INN',
}

interface ILocationChangeAction {
    type: typeof LOCATION_CHANGE;
    payload: RouterState;
}

enum ISprak {
    nb = 'nb',
    nn = 'nn',
}

export { AppStatus, ILocationChangeAction, ISprak };
