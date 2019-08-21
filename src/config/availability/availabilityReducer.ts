import {
  GET_RESOURCE_AVAILABILITY_FAILURE,
  GET_RESOURCE_AVAILABILITY_SUCCESS
} from './availabilityActions';

export const initialState = {
  resources: {},
  error: null
};

const availabilityReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_RESOURCE_AVAILABILITY_SUCCESS: {
      return {
        ...state,
        resources: action.result
      };
    }
    case GET_RESOURCE_AVAILABILITY_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default availabilityReducer;
