import { IRootState } from '../rootReducer';

function selectAppStatus(state: IRootState) {
    return state.app.status;
}

function selectAppSteg(state: IRootState) {
    return state.app.steg;
}

function selectHarForsoktNesteSteg(state: IRootState) {
    return state.app.harForsoktNesteSteg;
}

function selectValgtSprak(state: IRootState) {
    return state.app.valgtSprak;
}

export { selectAppStatus, selectAppSteg, selectHarForsoktNesteSteg, selectValgtSprak };
