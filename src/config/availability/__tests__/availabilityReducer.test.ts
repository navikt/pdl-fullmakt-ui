import availabilityReducer, { initialState } from '../availabilityReducer';
import {
  GET_RESOURCE_AVAILABILITY_FAILURE,
  GET_RESOURCE_AVAILABILITY_SUCCESS
} from '../availabilityActions';

describe('availabilityReducer', () => {
  test('should return the initial state', () => {
    const state = availabilityReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test('should handle GET_RESOURCE_AVAILABILITY_SUCCESS', () => {
    const successAction = {
      type: GET_RESOURCE_AVAILABILITY_SUCCESS,
      result: 'test'
    };

    const result = availabilityReducer(initialState, successAction);

    expect(result.resources).toBe('test');
  });

  test('should handle GET_RESOURCE_AVAILABILITY_FAILURE', () => {
    const errorAction = {
      type: GET_RESOURCE_AVAILABILITY_FAILURE,
      error: 'test'
    };

    const result = availabilityReducer(initialState, errorAction);

    expect(result.error).toBe('test');
  });
});
