import { IRootState } from '../rootReducer';

function selectTekster(state: IRootState) {
    return state.tekster.tekster;
}

export { selectTekster };
