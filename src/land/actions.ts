import { Action } from 'redux';
import { ILandBundle } from './types';

enum LandTypeKeys {
    HENT = 'LAND_HENT',
    HENT_OK = 'LAND_HENT_OK',
    HENT_FEILET = 'LAND_HENT_FEILET',
}

type LandActionTypes = ILandHent | ILandHentOK | ILandHentFeilet;

interface ILandHent extends Action {
    type: LandTypeKeys.HENT;
}

interface ILandHentOK extends Action {
    type: LandTypeKeys.HENT_OK;
    land: ILandBundle;
}

interface ILandHentFeilet extends Action {
    type: LandTypeKeys.HENT_FEILET;
}

function landHent(): ILandHent {
    return {
        type: LandTypeKeys.HENT,
    };
}

function landHentOk(land: ILandBundle): ILandHentOK {
    return {
        land,
        type: LandTypeKeys.HENT_OK,
    };
}

function landHentFeilet(): ILandHentFeilet {
    return {
        type: LandTypeKeys.HENT_FEILET,
    };
}

export { LandTypeKeys, LandActionTypes, landHent, landHentOk, landHentFeilet };
