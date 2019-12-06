import Environment from '../utils/Environments';
import { HTTPError } from '../components/error/Error';
import { logApiError } from '../utils/logger';
import { FullmaktSendType } from '../types/fullmakt';

const { appUrl, loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();

function throwFormatteError(err: any, url: string) {
  const error = {
    code: err.status || 404,
    text: err.error + (err.message ? ' : ' + err.message : '')
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
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
    return await response.json();
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
