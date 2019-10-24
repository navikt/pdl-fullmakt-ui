import { AuthInfo, FetchAuthInfo } from '../types/authInfo';
import { KontaktInfo } from '../types/kontaktInfo';
import { Sprak } from '../types/sprak';
import sprak from '../language/provider';
import { HTTPError } from '../components/error/Error';
import { FetchFullmakt, FullmaktType } from '../types/fullmakt';
import { FetchOmraade, Omraade } from '../types/omraade';

export const initialState = {
  fodselsnr: '',
  language: sprak,
  locale: 'nb' as 'nb',
  auth: { status: 'LOADING' } as FetchAuthInfo,
  kontaktInfo: { mobiltelefonnummer: '' },
  fullmatsgiver: { status: 'LOADING' } as FetchFullmakt,
  fullmektig: { status: 'LOADING' } as FetchFullmakt,
  omraade: { status: 'LOADING' } as FetchOmraade
};

export interface Store {
  locale: 'nb';
  language: Sprak;
  auth: FetchAuthInfo;
  fodselsnr: string;
  kontaktInfo: KontaktInfo;
  fullmatsgiver: FetchFullmakt;
  fullmektig: FetchFullmakt;
  omraade: FetchOmraade;
}

export type Action =
  | {
      type: 'SETT_AUTH_RESULT';
      payload: AuthInfo;
    }
  | {
      type: 'SETT_AUTH_ERROR';
      payload: HTTPError;
    }
  | {
      type: 'SETT_FODSELSNR';
      payload: {
        fodselsnr: string;
      };
    }
  | {
      type: 'SETT_KONTAKT_INFO_RESULT';
      payload: KontaktInfo;
    }
  | {
      type: 'SETT_FULLMAKTSGIVER';
      payload: FullmaktType[];
    }
  | {
      type: 'SETT_FULLMAKTSGIVER_ERROR';
      payload: HTTPError;
    }
  | {
      type: 'SETT_FULLMEKTIG';
      payload: FullmaktType[];
    }
  | {
      type: 'SETT_FULLMEKTIG_ERROR';
      payload: HTTPError;
    }
  | {
      type: 'SETT_OMRAADE';
      payload: Omraade[];
    }
  | {
      type: 'SETT_OMRAADE_ERROR';
      payload: HTTPError;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case 'SETT_AUTH_RESULT':
      return {
        ...state,
        auth: {
          status: 'RESULT',
          data: action.payload
        } as FetchAuthInfo
      };
    case 'SETT_AUTH_ERROR':
      return {
        ...state,
        auth: {
          status: 'ERROR',
          error: action.payload
        } as FetchAuthInfo
      };
    case 'SETT_FODSELSNR':
      return {
        ...state,
        fodselsnr: action.payload.fodselsnr
      };
    case 'SETT_KONTAKT_INFO_RESULT':
      return {
        ...state,
        kontaktInfo: action.payload as KontaktInfo
      };
    case 'SETT_FULLMAKTSGIVER':
      return {
        ...state,
        fullmatsgiver: {
          status: 'RESULT',
          data: action.payload
        } as FetchFullmakt
      };
    case 'SETT_FULLMAKTSGIVER_ERROR':
      return {
        ...state,
        fullmatsgiver: {
          status: 'ERROR',
          error: action.payload
        } as FetchFullmakt
      };
    case 'SETT_FULLMEKTIG':
      return {
        ...state,
        fullmektig: {
          status: 'RESULT',
          data: action.payload
        } as FetchFullmakt
      };
    case 'SETT_FULLMEKTIG_ERROR':
      return {
        ...state,
        fullmektig: {
          status: 'ERROR',
          error: action.payload
        } as FetchFullmakt
      };
    case 'SETT_OMRAADE':
      return {
        ...state,
        omraade: {
          status: 'RESULT',
          data: action.payload
        } as FetchOmraade
      };
    case 'SETT_OMRAADE_ERROR':
      return {
        ...state,
        omraade: {
          status: 'ERROR',
          error: action.payload
        } as FetchOmraade
      };
    default:
      return state;
  }
};
