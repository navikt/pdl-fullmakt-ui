import { Action } from 'redux';
import { ITeksterBundle } from './types';

enum TeksterTypeKeys {
    HENT = 'TEKSTER_HENT',
    HENT_OK = 'TEKSTER_HENT_OK',
    HENT_FEILET = 'TEKSTER_HENT_FEILET',
}

type TeksterActionTypes = ITeksterHent | ITeksterHentOK | ITeksterHentFeilet;

interface ITeksterHent extends Action {
    type: TeksterTypeKeys.HENT;
}

interface ITeksterHentOK extends Action {
    type: TeksterTypeKeys.HENT_OK;
    tekster: ITeksterBundle;
}

interface ITeksterHentFeilet extends Action {
    type: TeksterTypeKeys.HENT_FEILET;
}

function teksterHent(): ITeksterHent {
    return {
        type: TeksterTypeKeys.HENT,
    };
}

function teksterHentOk(tekster: ITeksterBundle): ITeksterHentOK {
    return {
        tekster,
        type: TeksterTypeKeys.HENT_OK,
    };
}

function teksterHentFeilet(): ITeksterHentFeilet {
    return {
        type: TeksterTypeKeys.HENT_FEILET,
    };
}

export { TeksterTypeKeys, TeksterActionTypes, teksterHent, teksterHentOk, teksterHentFeilet };
