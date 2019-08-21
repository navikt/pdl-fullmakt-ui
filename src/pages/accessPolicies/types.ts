import { ActionType } from 'typesafe-actions';

import * as policyActions from './actions';
import { CodeList, InformationType, LegalBasis } from '../fullmakt/types';

export type PolicyActions = ActionType<typeof policyActions>;

export const enum PolicyActionTypes {
  FETCH_POLICY_REQUEST = '@data/FETCH_POLICY_REQUEST',
  FETCH_POLICY_SUCCESS = '@data/FETCH_POLICY_SUCCESS',
  FETCH_POLICY_FAILURE = '@data/FETCH_POLICY_FAILURE'
}

export interface Policy {
  policyId?: number;
  informationType?: InformationType;
  purpose?: CodeList;
  legalBasisDescription?: string;
  legalBasis?: LegalBasis;
}

export interface PolicyResult {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  content: Policy[];
}

export interface PolicyState {
  result: PolicyResult;
  pending: boolean;
  error: string | null;
  previousQuery: string | null;
}
