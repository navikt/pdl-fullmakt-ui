import Environment from '../utils/Environments';
import { HTTPError } from '../components/error/Error';
import { logApiError } from '../utils/logger';
import { FullmaktSendType } from '../types/fullmakt';

const { appUrl, loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();

const parseJson = (data: any) => data.json();

const parseSjekkForFeil = (response: any) => {
  if (response.ok) {
    return parseJson(response);
  } else {
    const errorRes = parseJson(response);
    const error = {
      code: errorRes.status,
      text: errorRes.error + (errorRes.message ? ' : ' + errorRes.message : '')
    };
    console.log(errorRes);
    console.log(error);
    throw error;
  }
};

const hentJson = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    credentials: 'include'
  })
    .then(response => parseSjekkForFeil(response))
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

const sendJson = (url: string, data: FullmaktSendType, put: boolean): any =>
  fetch(url, {
    method: put ? 'PUT' : 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
    .then(response => parseSjekkForFeil(response))
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || JSON.stringify(err)
      };
      console.log('errror :', error);
      logApiError(url, error);
      throw error;
    });

const deleteRequest = (url: string): any =>
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
    .then(response => parseSjekkForFeil(response))
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

export const sendTilLogin = () => {
  const { pathname } = window.location;

  if (pathname.includes('/fullmakt')) {
    window.location.assign(`${loginUrl}?redirect=${appUrl}/fullmakt`);
  } else {
    window.location.assign(`${loginUrl}?redirect=${appUrl}`);
  }
};

export const fetchFodselsnr = () => hentJson(`${apiUrl}/fodselsnr`);

export const fetchAuthInfo = () => hentJson(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchKontaktInfo = () => hentJson(`${personInfoApiUrl}/kontaktinformasjon`);

export const fetchFullmaktsgiver = (fodselsnr: string) =>
  hentJson(`${apiUrl}/fullmaktsgiver/${fodselsnr}`);

export const fetchFullmektig = (fodselsnr: string) =>
  hentJson(`${apiUrl}/fullmektig/${fodselsnr}`);

export const fetchOmraade = () => hentJson(`${apiUrl}/omraade`);

export const postFullmakt = (data: FullmaktSendType, put: boolean) =>
  sendJson(`${apiUrl}/fullmakt`, data, put);

export const deleteFullmakt = (fullmaktID: string) =>
  deleteRequest(`${apiUrl}/fullmakt/${fullmaktID}`);

export const postFeilOgMangler = (data: any): any =>
  sendJson(`${apiUrl}/feil-og-mangler`, data, false);
