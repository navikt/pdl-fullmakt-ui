import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { dataReducer } from '../pages/fullmakt/reducer';
import { DataState } from '../pages/fullmakt/types';
import configReducer from '../config/configReducer';
import { codeListReducer } from '../pages/producers/reducer';
import { policyReducer } from '../pages/accessPolicies/reducer';

export interface AppState {
  router: RouterState;
  fullmakt: DataState;
}

const reducers = {
  config: configReducer,
  fullmakt: dataReducer,
  codeList: codeListReducer,
  policy: policyReducer
};

export default (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    ...reducers
  });
