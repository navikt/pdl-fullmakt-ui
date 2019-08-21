import * as actions from '../availabilityActions';

describe('availabilityActions', () => {
  test('should create an action to set availability on success', () => {
    const result = 'test';
    const expectedAction = {
      type: actions.GET_RESOURCE_AVAILABILITY_SUCCESS,
      result
    };

    expect(actions.getResourceAvailabilitySuccess(result)).toEqual(expectedAction);
  });

  test('should create an action to pass an error on failure', () => {
    const error = 'test';
    const expectedAction = {
      type: actions.GET_RESOURCE_AVAILABILITY_FAILURE,
      error
    };

    expect(actions.getResourceAvailabilityFailure(error)).toEqual(expectedAction);
  });
});
