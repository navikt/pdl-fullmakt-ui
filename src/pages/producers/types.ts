import { ActionType } from 'typesafe-actions';

import * as codeListActions from './actions';

export type CodeListActions = ActionType<typeof codeListActions>;

export const enum CodeListActionTypes {
  FETCH_CODE_LIST_REQUEST = '@data/FETCH_CODE_LIST_REQUEST',
  FETCH_CODE_LIST_SUCCESS = '@data/FETCH_CODE_LIST_SUCCESS',
  FETCH_CODE_LIST_FAILURE = '@data/FETCH_CODE_LIST_FAILURE'
}

export interface CodeListView {
  code: string;
  description: string;
}

export interface CodeListResult {
  producer: CodeListView[] | null;
  category: CodeListView[] | null;
  system: CodeListView[] | null;
  purpose: CodeListView[] | null;
}

export interface CodeListState {
  result: CodeListResult;
  pending: boolean;
  error?: string | null;
}
