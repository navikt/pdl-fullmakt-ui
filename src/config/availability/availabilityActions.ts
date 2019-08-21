export const GET_RESOURCE_AVAILABILITY_SUCCESS =
  'config/get-resource-availability-success';
export const GET_RESOURCE_AVAILABILITY_FAILURE =
  'config/get-resource-availability-failure';

export const getResourceAvailabilitySuccess = (result: any) => ({
  type: GET_RESOURCE_AVAILABILITY_SUCCESS,
  result
});

export const getResourceAvailabilityFailure = (error: any) => ({
  type: GET_RESOURCE_AVAILABILITY_FAILURE,
  error
});
