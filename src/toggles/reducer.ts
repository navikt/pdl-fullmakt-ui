import { ToggelsTypeKeys, TogglesActionTypes } from './actions';
import { allTogglesOff, IToggles } from './types';

interface ITogglesState {
    readonly henter: boolean;
    readonly toggles: IToggles;
}

const initialState: ITogglesState = {
    henter: false,
    toggles: {},
};

function toggelsReducer(state = initialState, action: TogglesActionTypes) {
    switch (action.type) {
        case ToggelsTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case ToggelsTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                toggles: action.toggles,
            };
        case ToggelsTypeKeys.HENT_FEILET:
            return {
                ...state,
                henter: false,
                toggles: allTogglesOff(),
            };
        default:
            return state;
    }
}

export { ITogglesState, toggelsReducer };
