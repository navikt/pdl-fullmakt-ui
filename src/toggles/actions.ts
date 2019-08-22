import { Action } from 'redux';
import { IToggles } from './types';

enum ToggelsTypeKeys {
    HENT = 'TOGGLES_HENT',
    HENT_OK = 'TOGGLES_HENT_OK',
    HENT_FEILET = 'TOGGLES_HENT_FEILET',
}

type TogglesActionTypes = ITogglesHent | ITogglesHentOk | ITogglesHentFeilet;

interface ITogglesHent extends Action {
    type: ToggelsTypeKeys.HENT;
}

interface ITogglesHentOk extends Action {
    type: ToggelsTypeKeys.HENT_OK;
    toggles: IToggles;
}

interface ITogglesHentFeilet extends Action {
    type: ToggelsTypeKeys.HENT_FEILET;
}

function togglesHent(): ITogglesHent {
    return {
        type: ToggelsTypeKeys.HENT,
    };
}

function togglesHentOk(toggles: IToggles): ITogglesHentOk {
    return {
        toggles,
        type: ToggelsTypeKeys.HENT_OK,
    };
}

function togglesHentFeilet(): ITogglesHentFeilet {
    return {
        type: ToggelsTypeKeys.HENT_FEILET,
    };
}

export { TogglesActionTypes, ToggelsTypeKeys, togglesHent, togglesHentOk, togglesHentFeilet };
