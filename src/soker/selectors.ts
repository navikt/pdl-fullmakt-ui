import { IRootState } from '../rootReducer';
import { ISoker } from './types';

function selectSoker(state: IRootState): ISoker {
    return state.soker.soker;
}

export { selectSoker };
