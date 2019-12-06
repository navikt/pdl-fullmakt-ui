import Environment from '../utils/Environments';
import { logApiError } from '../utils/logger';
import { FullmaktSendType } from '../types/fullmakt';

const { appUrl, loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();

function throwFormatteError(err: any, url: string, message: string = '') {
  const error = {
    code: err.status || 404,
    text: err.error + (message !== '' ? ' : ' + message : '')
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
    return await response.json();
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
      await throwFormatteError(json, url, json.message ? json.message : '');
    }
    return await response.json().catch(err => throwFormatteError(err, url));
  } catch (err) {
    throwFormatteError(err, url);
  }
}

async function deleteRequest(url: string) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
    return await response.json();
  } catch (err) {
    throwFormatteError(err, url);
  }
}

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
