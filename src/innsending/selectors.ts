import { IRootState } from '../rootReducer';

function selectSenderInn(state: IRootState) {
    return state.innsending.senderinn;
}

function selectInnsendtDato(state: IRootState) {
    return state.innsending.innsendtDato;
}

export { selectSenderInn, selectInnsendtDato };
