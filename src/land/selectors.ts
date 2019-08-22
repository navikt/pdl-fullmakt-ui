import { IRootState } from '../rootReducer';

function selectLand(state: IRootState) {
    return state.land.land;
}

export { selectLand };
