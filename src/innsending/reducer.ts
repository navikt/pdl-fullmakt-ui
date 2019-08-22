import * as moment from 'moment-timezone';
import { InnsendingActionTypes, InnsendingTypeKeys } from './actions';

interface IInnsendingState {
    readonly innsendtDato: moment.Moment;
    readonly senderinn: boolean;
}

const initialState: IInnsendingState = {
    innsendtDato: moment(),
    senderinn: false,
};

function innsendingReducer(state = initialState, action: InnsendingActionTypes) {
    switch (action.type) {
        case InnsendingTypeKeys.SENDINN:
            return {
                ...state,
                senderinn: true,
            };
        case InnsendingTypeKeys.SENDINN_OK:
            return {
                ...state,
                innsendtDato: action.innsendtDato,
                senderinn: false,
            };
        case InnsendingTypeKeys.SENDINN_FEILET:
            return {
                ...state,
                senderinn: false,
            };
        default:
            return state;
    }
}

export { innsendingReducer, IInnsendingState };
