import { Reducer } from 'redux';

import { PolicyActions, PolicyActionTypes, PolicyState } from './types';

export const initialState: PolicyState = {
  result: {
    currentPage: 0,
    pageSize: 20,
    totalElements: 0,
    content: []
  },
  pending: false,
  error: null,
  previousQuery: null
};

const reducer: Reducer<any, PolicyActions> = (state = initialState, action) => {
  switch (action.type) {
    case PolicyActionTypes.FETCH_POLICY_REQUEST:
      return {
        ...state,
        pending: true
      };
    case PolicyActionTypes.FETCH_POLICY_SUCCESS:
      return {
        ...state,
        result: action.payload.result,
        error: undefined,
        pending: false
      };
    case PolicyActionTypes.FETCH_POLICY_FAILURE:
      return {
        ...state,
        result: [],
        error: action.payload.error,
        pending: false
      };
    default:
      return state;
  }
};

export { reducer as policyReducer };
