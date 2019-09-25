import { HTTPError } from '../components/error/Error';

export type FetchFullmakt =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: FullmaktType[] }
  | { status: 'ERROR'; error: HTTPError };

export type FullmaktViewType = {
  fullmaktsgiverNavn: string;
  fullmaktsgiverFodselsnr: string;
  fullmektigNavn: string;
  fullmektigFodselsnr: string;
  omraade: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed?: string;
};

export type FullmaktOtherType = {
  fullmaktId?: number;
  registrert: string;
  registrertAv: string;
  endret?: string;
  endretAv?: string;
  opphoert?: boolean;
  fullmaktsgiver: string;
  fullmektig: string;
};

export type FullmaktType = FullmaktViewType & FullmaktOtherType;
