import { action } from 'typesafe-actions';
import { CodeListActionTypes } from './types';

export const fetchCodeList = () => action(CodeListActionTypes.FETCH_CODE_LIST_REQUEST);

export const fetchCodeListSuccess = (result: any) =>
  action(CodeListActionTypes.FETCH_CODE_LIST_SUCCESS, { result });

export const fetchCodeListFailure = (error: any) =>
  action(CodeListActionTypes.FETCH_CODE_LIST_FAILURE, { error });
