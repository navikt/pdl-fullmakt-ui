import { IRootState } from '../rootReducer';
import { IBarn } from './types';

function selectBarn(state: IRootState): IBarn[] {
    return state.barn.barn;
}

export { selectBarn };
