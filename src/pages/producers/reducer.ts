import { Reducer } from 'redux';

import { CodeListActions, CodeListActionTypes, CodeListState } from './types';

export const initialState: CodeListState = {
  result: {
    producer: null,
    category: null,
    system: null,
    purpose: null
  },
  pending: false,
  error: null
};

const reducer: Reducer<any, CodeListActions> = (state = initialState, action) => {
  switch (action.type) {
    case CodeListActionTypes.FETCH_CODE_LIST_REQUEST:
      return {
        ...state,
        pending: true
      };
    case CodeListActionTypes.FETCH_CODE_LIST_SUCCESS:
      return {
        ...state,
        result: action.payload.result,
        error: undefined,
        pending: false
      };
    case CodeListActionTypes.FETCH_CODE_LIST_FAILURE:
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

export { reducer as codeListReducer };
