import { action } from 'typesafe-actions';
import { PolicyActionTypes } from './types';

export const fetchPolicy = () => action(PolicyActionTypes.FETCH_POLICY_REQUEST);

export const fetchPolicySuccess = (result: any) =>
  action(PolicyActionTypes.FETCH_POLICY_SUCCESS, { result });

export const fetchPolicyFailure = (error: any) =>
  action(PolicyActionTypes.FETCH_POLICY_FAILURE, { error });
