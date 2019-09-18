import { HTTPError } from '../components/error/Error';

export type FetchEnheter =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: Enheter[] }
  | { status: 'ERROR'; error: HTTPError };

export interface Enheter {
  enhetsnummer: string;
  enhetsnavn: string;
  type: string;
  status: string;
  organisasjonsnummer?: string;
  telefonnummer?: string;
  telefonnummerKommentar?: string;
  faksnummer?: string;
  epostadresse?: string;
  epostkommentar?: string;
  epostKunIntern: boolean;
  publikumsmottak?: string;
  postnummer: string;
  poststed: string;
  postboks: string;
  postGatenavn: string;
  postHusnummer: string;
  postHusbokstav: string;
  besokPostnummer?: string;
  besokPoststed?: string;
  besokGatenavn?: string;
  besokHusnummer?: string;
  besokHusbokstav?: string;
  spesielleOpplysninger?: string;
}
