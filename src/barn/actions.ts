import { Action } from 'redux';
import { IBarn } from './types';

enum BarnTypeKeys {
    HENT = 'BARN_HENT',
    HENT_OK = 'BARN_HENT_OK',
    HENT_FEILET = 'BARN_HENT_FEILET',
}

type BarnActionTypes = IBarnHent | IBarnHentOk | IBarnHentFeilet;

interface IBarnHent extends Action {
    type: BarnTypeKeys.HENT;
}

interface IBarnHentOk extends Action {
    type: BarnTypeKeys.HENT_OK;
    barn: IBarn[];
}

interface IBarnHentFeilet extends Action {
    type: BarnTypeKeys.HENT_FEILET;
}

function barnHent(): IBarnHent {
    return {
        type: BarnTypeKeys.HENT,
    };
}

function barnHentOk(barn: IBarn[]): IBarnHentOk {
    return {
        barn,
        type: BarnTypeKeys.HENT_OK,
    };
}

function barnHentFeilet(): IBarnHentFeilet {
    return {
        type: BarnTypeKeys.HENT_FEILET,
    };
}

export { BarnActionTypes, barnHent, barnHentFeilet, barnHentOk, BarnTypeKeys };
