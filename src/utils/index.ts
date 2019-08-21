import { omitBy } from 'lodash';
import * as qs from 'qs';

export const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
};

export const filterEmpty = (data: any) => omitBy(data, v => !v);

export const isNullOrEmptyString = (val: string) => val == null || val === '';

export const getQueryParameters = (queryString: string) =>
  qs.parse(queryString, { ignoreQueryPrefix: true });
