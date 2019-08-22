import { LandActionTypes, LandTypeKeys } from './actions';
import { ILandBundle } from './types';

interface ILandState {
    readonly henter: boolean;
    readonly land: ILandBundle;
}

const initialState: ILandState = {
    henter: false,
    land: {},
};

function landReducer(state = initialState, action: LandActionTypes) {
    switch (action.type) {
        case LandTypeKeys.HENT:
            return {
                ...state,
                henter: true,
            };
        case LandTypeKeys.HENT_OK:
            return {
                ...state,
                henter: false,
                land: action.land,
            };
        case LandTypeKeys.HENT_FEILET:
            return {
                ...state,
                henter: false,
            };
        default:
            return state;
    }
}

export { ILandState, landReducer };
