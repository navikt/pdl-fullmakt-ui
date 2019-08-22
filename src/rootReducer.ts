import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { barnReducer, IBarnState } from './barn/reducer';
import { IInnsendingState, innsendingReducer } from './innsending/reducer';
import { ILandState, landReducer } from './land/reducer';
import { ISokerState, sokerReducer } from './soker/reducer';
import { soknadReducer } from './soknad/reducer';
import { ISoknadState } from './soknad/types';
import { ITeksterState, teksterReducer } from './tekster/reducer';
import { ITogglesState, toggelsReducer } from './toggles/reducer';

export interface IRootState {
    app: IAppState;
    barn: IBarnState;
    innsending: IInnsendingState;
    land: ILandState;
    soker: ISokerState;
    router: RouterState;
    soknad: ISoknadState;
    tekster: ITeksterState;
    toggles: ITogglesState;
}

const rootReducer = (history: History) =>
    combineReducers({
        app: appReducer,
        barn: barnReducer,
        innsending: innsendingReducer,
        land: landReducer,
        router: connectRouter(history),
        soker: sokerReducer,
        soknad: soknadReducer,
        tekster: teksterReducer,
        toggles: toggelsReducer,
    });

export { rootReducer };
