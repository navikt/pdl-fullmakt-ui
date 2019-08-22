import { IRootState } from '../rootReducer';
import { IToggleName } from './types';

function isEnabled(state: IRootState, toggleName: IToggleName): boolean {
    return state.toggles.toggles[toggleName];
}

export { isEnabled };
