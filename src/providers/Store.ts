import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { Sprak } from "../types/sprak";
import sprak from "../language/provider";
import { Enheter, FetchEnheter } from "../types/enheter";
import { HTTPError } from "../components/error/Error";

export const initialState = {
  fodselsnr: "",
  language: sprak,
  locale: "nb" as "nb",
  enheter: { status: "LOADING" } as FetchEnheter,
  auth: { authenticated: false } as AuthInfo,
  kontaktInfo: { mobiltelefonnummer: "" }
};

export interface Store {
  locale: "nb";
  language: Sprak;
  auth: AuthInfo;
  fodselsnr: string;
  kontaktInfo: KontaktInfo;
  enheter: FetchEnheter;
}

export type Action =
  | {
      type: "SETT_ENHETER_RESULT";
      payload: Enheter[];
    }
  | {
      type: "SETT_ENHETER_ERROR";
      payload: HTTPError;
    }
  | {
      type: "SETT_AUTH_RESULT";
      payload: AuthInfo;
    }
  | {
      type: "SETT_FODSELSNR";
      payload: {
        fodselsnr: string;
      };
    }
  | {
      type: "SETT_KONTAKT_INFO_RESULT";
      payload: KontaktInfo;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: action.payload as AuthInfo
      };
    case "SETT_ENHETER_RESULT":
      return {
        ...state,
        enheter: {
          status: "RESULT",
          data: action.payload
        } as FetchEnheter
      };
    case "SETT_ENHETER_ERROR":
      return {
        ...state,
        enheter: {
          status: "ERROR",
          error: action.payload
        } as FetchEnheter
      };
    case "SETT_FODSELSNR":
      return {
        ...state,
        fodselsnr: action.payload.fodselsnr
      };
    case "SETT_KONTAKT_INFO_RESULT":
      return {
        ...state,
        kontaktInfo: action.payload as KontaktInfo
      };
    default:
      return state;
  }
};
