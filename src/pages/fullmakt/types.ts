import { ActionType } from 'typesafe-actions';

import * as dataActions from './actions';

export type DataActions = ActionType<typeof dataActions>;

export const enum DataActionTypes {
  FETCH_INFORMATION_TYPE_REQUEST = '@data/FETCH_INFORMATION_TYPE_REQUEST',
  FETCH_INFORMATION_TYPE_SUCCESS = '@data/FETCH_INFORMATION_TYPE_SUCCESS',
  FETCH_INFORMATION_TYPE_FAILURE = '@data/FETCH_INFORMATION_TYPE_FAILURE',

  TOGGLE_ROW = '@data//TOGGLE_ROW',
  ADD_INFORMATION_TYPE = '@data//ADD_INFORMATION_TYPE',
  SAVE_INFORMATION_TYPE_REQUEST = '@data/SAVE_INFORMATION_TYPE_REQUEST',
  SAVE_INFORMATION_TYPE_SUCCESS = '@data/SAVE_INFORMATION_TYPE_SUCCESS',
  SAVE_INFORMATION_TYPE_FAILURE = '@data/SAVE_INFORMATION_TYPE_FAILURE',
  DELETE_INFORMATION_TYPE_REQUEST = '@data/DELETE_INFORMATION_TYPE_REQUEST',
  DELETE_INFORMATION_TYPE_SUCCESS = '@data/DELETE_INFORMATION_TYPE_SUCCESS',
  DELETE_INFORMATION_TYPE_FAILURE = '@data/DELETE_INFORMATION_TYPE_FAILURE',

  TOGGLE_ROW_POLICY = '@data//TOGGLE_ROW_POLICY',
  ADD_POLICY = '@data//ADD_POLICY',
  SAVE_POLICY_REQUEST = '@data/SAVE_POLICY_REQUEST',
  SAVE_POLICY_SUCCESS = '@data/SAVE_POLICY_SUCCESS',
  SAVE_POLICY_FAILURE = '@data/SAVE_POLICY_FAILURE',
  DELETE_POLICY_REQUEST = '@data/DELETE_POLICY_REQUEST',
  DELETE_POLICY_SUCCESS = '@data/DELETE_POLICY_SUCCESS',
  DELETE_POLICY_FAILURE = '@data/DELETE_POLICY_FAILURE',
  TOGGLE_EDIT_VIEW = '@data//TOGGLE_EDIT_VIEW',

  FETCH_POLICY_FOR_INFORMATION_TYPE_REQUEST = '@data/FETCH_POLICY_FOR_INFORMATION_TYPE_REQUEST',
  FETCH_POLICY_FOR_INFORMATION_TYPE_SUCCESS = '@data/FETCH_POLICY_FOR_INFORMATION_TYPE_SUCCESS',
  FETCH_POLICY_FOR_INFORMATION_TYPE_FAILURE = '@data/FETCH_POLICY_FOR_INFORMATION_TYPE_FAILURE'
}

export type DataState =
  | {
      pending: boolean;
      error: String | null;
      previousQuery: String | null;
      result: Result;
    }
  | undefined;

export type Result = {
  currentPage: number;
  pageSize: number;
  totalPages?: number;
  totalElements: number;
  content: InformationTypeView[];
};

export interface Auditable {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface CodeList extends Auditable {
  code: string;
  description: string;
}

export interface InformationType extends Auditable {
  informationTypeId: number;
  name: string;
  description: string;
  personalData?: boolean | string;
  isOpen?: boolean;
  isEdit?: boolean;
  error?: string;
  category?: CodeList;
  producer?: CodeList[];
  system?: CodeList;

  elasticsearchId?: number;
  elasticsearchStatus?: string;
}

export interface LegalBasis extends Auditable {
  legalBasisid: number;
  description: string;
}

export interface Policy extends Auditable {
  policyId: number;
  informationType: {
    informationTypeId: number;
    name: string;
  };
  purpose?: CodeList;
  legalBasisDescription?: string;
  isOpen?: boolean;
  isEdit?: boolean;
  isAdd?: boolean;
  error?: string;
}

export interface InformationTypeView extends InformationType {
  policy?: PolicyResult;
}

export interface PolicyResult {
  result: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    content: Policy[];
  };
  pending: boolean;
  error: string | null;
  previousQuery: string | null;
}

export const PolicyResultDefaultValue = {
  result: {
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
    content: []
  },
  pending: false,
  error: null,
  previousQuery: null
};

export interface ApiError {
  readonly message: string;
}
