import { Action } from 'redux';
import { ISoker } from './types';

enum SokerTypeKeys {
    HENT_FORTROLIG_ADRESSE = 'SOKER_HENT_FORTROLIG_ADRESSE',
    HENT = 'SOKER_HENT',
    HENT_OK = 'SOKER_HENT_OK',
    HENT_FEILET = 'SOKER_HENT_FEILET',
}

type SokerActionTypes = ISokerHent | ISokerHentOk | ISokerHentFeilet;

interface ISokerHent extends Action {
    type: SokerTypeKeys.HENT;
}

interface ISokerHentOk extends Action {
    type: SokerTypeKeys.HENT_OK;
    soker: ISoker;
}

interface ISokerHentFeilet extends Action {
    type: SokerTypeKeys.HENT_FEILET;
}

interface ISokerHentFortroligAdresse extends Action {
    type: SokerTypeKeys.HENT_FORTROLIG_ADRESSE;
}

function sokerHent(): ISokerHent {
    return {
        type: SokerTypeKeys.HENT,
    };
}

function sokerHentOk(soker: ISoker): ISokerHentOk {
    return {
        soker,
        type: SokerTypeKeys.HENT_OK,
    };
}

function sokerHentFeilet(): ISokerHentFeilet {
    return {
        type: SokerTypeKeys.HENT_FEILET,
    };
}

function sokerHentFortroligAdresse(): ISokerHentFortroligAdresse {
    return {
        type: SokerTypeKeys.HENT_FORTROLIG_ADRESSE,
    };
}

export {
    SokerActionTypes,
    sokerHent,
    sokerHentFeilet,
    sokerHentOk,
    sokerHentFortroligAdresse,
    SokerTypeKeys,
};
