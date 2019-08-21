import { isEmpty } from 'lodash';
import * as qs from 'qs';

import { filterEmpty, getCookie } from '../utils';
import { TOKEN } from './headers';
import { RestService } from './restServiceNames';
import { getToken } from '../adal/adal';

export * from './restServiceNames';

const commonHeaders = Object.freeze({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + getToken
});

export const restExternalGet = (
  path: string,
  restService: RestService,
  headers = {},
  pathVariables = {}
) => {
  return restGet(
    '/api/proxy/' + path,
    { ...headers, ...restService.header },
    pathVariables
  );
};

export const restGet = (url: string, headers = {}, pathVariables = {}) => {
  const filteredPathVariables = filterEmpty(pathVariables);
  const queryString = isEmpty(filteredPathVariables)
    ? ''
    : '?' + qs.stringify(filteredPathVariables);

  return fetch(url + queryString, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      ...commonHeaders,
      ...headers
    }
  });
};

export const restExternalPost = (
  path: string,
  restService: RestService,
  data: any,
  headers = {}
) => {
  return restPost('/api/proxy/' + path, data, {
    ...headers,
    ...restService.header
  });
};

export const restPost = (url: string, data: any, headers = {}) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      ...commonHeaders,
      [TOKEN]: getCookie('TOKEN'),
      ...headers
    },
    body: JSON.stringify(data)
  });
};

export const restPut = (url: string, data: any, headers = {}) => {
  return fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      ...commonHeaders,
      [TOKEN]: getCookie('TOKEN'),
      ...headers
    },
    body: JSON.stringify(data)
  });
};

export const restDelete = (url: string, headers = {}) => {
  return fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      ...commonHeaders,
      [TOKEN]: getCookie('TOKEN'),
      ...headers
    }
  });
};
