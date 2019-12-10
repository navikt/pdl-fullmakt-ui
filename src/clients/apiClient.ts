import Environment from '../utils/Environments';
import { logApiError } from '../utils/logger';
import { FullmaktSendType } from '../types/fullmakt';
import { HTTPError } from '../components/error/Error';

const { appUrl, loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();

function throwFormatteError(err: any, url: string) {
  const error = err.text
    ? err
    : {
        code: err.status || 404,
        text: err.error + (err.message !== '' ? ' : ' + err.message : '')
      };
  logApiError(url, error);
  throw error;
}

async function hentJson(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      credentials: 'include'
    });
    if (response.ok) {
      return await response.json();
    } else {
      const json = await response.json();
      throwFormatteError(json, url);
    }
  } catch (err) {
    throwFormatteError(err, url);
  }
}

async function sendJson(url: string, data: FullmaktSendType, put: boolean) {
  try {
    const response = await fetch(url, {
      method: put ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
    if (response.ok) {
      return await response.json();
    } else {
      const json = await response.json();
      throwFormatteError(json, url);
    }
  } catch (err) {
    throwFormatteError(err, url);
  }
}
const sjekkForFeil = (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text: response.statusText
    };
    throw error;
  }
};

const deleteRequest = (url: string): any =>
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
    .then(response => sjekkForFeil(url, response))
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

export const fetchUnleash = () => hentJson(`${baseUrl}/person/personopplysninger-api/feature-toggles?feature=pdl-fullmakt`);

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
