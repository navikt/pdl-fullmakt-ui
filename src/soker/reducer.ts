import { SokerActionTypes, SokerTypeKeys } from './actions';
import { ISoker } from './types';

interface ISokerState {
    readonly soker: ISoker;
    readonly henter: boolean;
}

const initialState: ISokerState = {
    henter: false,
    soker: {
        fornavn: '',
        fulltnavn: '',
        innloggetSom: '',
        statsborgerskap: '',
    },
};

function sokerReducer(state = initialState, action: SokerActionTypes) {
    switch (action.type) {
        case SokerTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case SokerTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                soker: action.soker,
            };
        case SokerTypeKeys.HENT_FEILET: {
            return {
                ...state,
                henter: false,
            };
        }
        default:
            return state;
    }
}

export { sokerReducer, ISokerState, initialState };
