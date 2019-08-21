import { action } from 'typesafe-actions';
import { get } from 'lodash';
import { ApiError } from './modelsApi';
import { DataActionTypes, InformationType, Policy } from './types';

export const fetchInformationType = (query: any) =>
  action(DataActionTypes.FETCH_INFORMATION_TYPE_REQUEST, {
    query: {
      ...query,
      sort: get(query, 'sort')
    }
  });

export const fetchInformationTypeSuccess = (result: any, previousQuery: any) =>
  action(DataActionTypes.FETCH_INFORMATION_TYPE_SUCCESS, { result, previousQuery });

export const fetchInformationTypeFailure = (error: ApiError) =>
  action(DataActionTypes.FETCH_INFORMATION_TYPE_FAILURE, { error });

export const toggleExpandRow = (informationTypeId: number) =>
  action(DataActionTypes.TOGGLE_ROW, { informationTypeId });

// add blank row for information type
export const addBlankInformationType = () => action(DataActionTypes.ADD_INFORMATION_TYPE);

// add or edit information type
export const saveInformationType = (informationType: InformationType) =>
  action(DataActionTypes.SAVE_INFORMATION_TYPE_REQUEST, {
    informationType
  });
export const saveInformationTypeSuccess = (
  result: InformationType,
  informationTypeId: number
) => action(DataActionTypes.SAVE_INFORMATION_TYPE_SUCCESS, { result, informationTypeId });

export const saveInformationTypeFailure = (error: ApiError, informationTypeId: number) =>
  action(DataActionTypes.SAVE_INFORMATION_TYPE_FAILURE, { error, informationTypeId });

// Delete information type
export const deleteInformationType = (informationTypeId: number) =>
  action(DataActionTypes.DELETE_INFORMATION_TYPE_REQUEST, {
    informationTypeId
  });
export const deleteInformationTypeSuccess = (
  result: InformationType,
  informationTypeId: number
) =>
  action(DataActionTypes.DELETE_INFORMATION_TYPE_SUCCESS, { result, informationTypeId });

export const deleteInformationTypeFailure = (
  error: ApiError,
  informationTypeId: number
) =>
  action(DataActionTypes.DELETE_INFORMATION_TYPE_FAILURE, { error, informationTypeId });

export const toggleExpandRowPolicy = (informationTypeId: number, policyId: number) =>
  action(DataActionTypes.TOGGLE_ROW_POLICY, { informationTypeId, policyId });

export const toggleEditView = (informationTypeId: number, policyId: number = -2) =>
  action(DataActionTypes.TOGGLE_EDIT_VIEW, { informationTypeId, policyId });

// Get the policy for information type
export const fetchPolicyForInformationType = (query: any, informationTypeId: number) =>
  action(DataActionTypes.FETCH_POLICY_FOR_INFORMATION_TYPE_REQUEST, {
    query: {
      ...query,
      sort: get(query, 'sort'),
      informationTypeId
    },
    informationTypeId
  });

export const fetchPolicyForInformationTypeSuccess = (
  result: any,
  previousQuery: any,
  informationTypeId: number
) =>
  action(DataActionTypes.FETCH_POLICY_FOR_INFORMATION_TYPE_SUCCESS, {
    result,
    previousQuery,
    informationTypeId
  });

export const fetchPolicyForInformationTypeFailure = (
  error: ApiError,
  informationTypeId: number
) =>
  action(DataActionTypes.FETCH_POLICY_FOR_INFORMATION_TYPE_FAILURE, {
    error,
    informationTypeId
  });

// add blank row for Policy
export const addBlankPolicy = (informationTypeId: number) =>
  action(DataActionTypes.ADD_POLICY, { informationTypeId });

// add or edit policy
export const savePolicy = (policy: Policy, informationTypeId: number, policyId: number) =>
  action(DataActionTypes.SAVE_POLICY_REQUEST, {
    policy,
    informationTypeId,
    policyId
  });
export const savePolicySuccess = (
  result: Policy,
  informationTypeId: number,
  policyId: number
) => action(DataActionTypes.SAVE_POLICY_SUCCESS, { result, informationTypeId, policyId });

export const savePolicyFailure = (
  error: ApiError,
  informationTypeId: number,
  policyId: number
) => action(DataActionTypes.SAVE_POLICY_FAILURE, { error, informationTypeId, policyId });

// delete policy
export const deletePolicy = (informationTypeId: number, policyId: number) =>
  action(DataActionTypes.DELETE_POLICY_REQUEST, {
    informationTypeId,
    policyId
  });
export const deletePolicySuccess = (
  result: Policy,
  informationTypeId: number,
  policyId: number
) =>
  action(DataActionTypes.DELETE_POLICY_SUCCESS, { result, informationTypeId, policyId });

export const deletePolicyFailure = (
  error: ApiError,
  informationTypeId: number,
  policyId: number
) =>
  action(DataActionTypes.DELETE_POLICY_FAILURE, { error, informationTypeId, policyId });
