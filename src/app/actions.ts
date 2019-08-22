import { Action } from 'redux';
import { AppStatus, ISprak } from './types';

enum AppTypeKeys {
    ENDRE_STATUS = 'APP_ENDRE_STATUS',
    START_APP = 'APP_START_APP',
    NESTE_STEG = 'APP_NESTE_STEG',
    FORRIGE_STEG = 'APP_FORRIGE_STEG',
    SETT_STEG = 'APP_SETT_STEG',
    GAA_TIL_STEG = 'APP_GAA_TIL_STEG',
    SETT_HAR_FORSOKT_NESTE_STEG = 'APP_SETT_HAR_FORSOKT_NESTE_STEG',
    PING_OK = 'APP_PING_OK',
    VELG_SPRAK = 'APP_VELG_SPRAK',
    SETT_SPRAK = 'APP_SETT_SPRAK',
}

type AppActionTypes =
    | IAppEndreStatus
    | IAppStart
    | IAppNesteSteg
    | IAppForrigeSteg
    | IAppSettSteg
    | IAppSettHarForsoktNesteSteg
    | IAppSettSprak
    | IAppVelgSprak;

interface IAppEndreStatus extends Action {
    status: AppStatus;
    type: AppTypeKeys.ENDRE_STATUS;
}

interface IAppStart extends Action {
    type: AppTypeKeys.START_APP;
}

interface IAppNesteSteg extends Action {
    type: AppTypeKeys.NESTE_STEG;
}

interface IAppForrigeSteg extends Action {
    type: AppTypeKeys.FORRIGE_STEG;
}

interface IAppGaaTilSteg extends Action {
    type: AppTypeKeys.GAA_TIL_STEG;
    steg: number;
}

interface IAppSettSteg extends Action {
    type: AppTypeKeys.SETT_STEG;
    steg: number;
}

interface IAppPingOk extends Action {
    type: AppTypeKeys.PING_OK;
}

interface IAppSettHarForsoktNesteSteg extends Action {
    type: AppTypeKeys.SETT_HAR_FORSOKT_NESTE_STEG;
    harForsoktNesteSteg: boolean;
}

interface IAppSettSprak extends Action {
    valgtSprak: ISprak;
    type: AppTypeKeys.SETT_SPRAK;
}

interface IAppVelgSprak extends Action {
    valgtSprak: ISprak;
    type: AppTypeKeys.VELG_SPRAK;
}

function appEndreStatus(status: AppStatus): IAppEndreStatus {
    return {
        status,
        type: AppTypeKeys.ENDRE_STATUS,
    };
}

function appStart(): IAppStart {
    return {
        type: AppTypeKeys.START_APP,
    };
}

function appNesteSteg(): IAppNesteSteg {
    return {
        type: AppTypeKeys.NESTE_STEG,
    };
}

function appForrigeSteg(): IAppForrigeSteg {
    return {
        type: AppTypeKeys.FORRIGE_STEG,
    };
}

function appGaaTilSteg(steg: number): IAppGaaTilSteg {
    return {
        steg,
        type: AppTypeKeys.GAA_TIL_STEG,
    };
}

function appSettSteg(steg: number): IAppSettSteg {
    return {
        steg,
        type: AppTypeKeys.SETT_STEG,
    };
}

function appSettHarForsoktNesteSteg(harForsoktNesteSteg: boolean): IAppSettHarForsoktNesteSteg {
    return {
        harForsoktNesteSteg,
        type: AppTypeKeys.SETT_HAR_FORSOKT_NESTE_STEG,
    };
}

function appPingOk(): IAppPingOk {
    return {
        type: AppTypeKeys.PING_OK,
    };
}

function appVelgSprak(valgtSprak: ISprak): IAppVelgSprak {
    return {
        type: AppTypeKeys.VELG_SPRAK,
        valgtSprak,
    };
}

function appSettSprak(valgtSprak: ISprak): IAppSettSprak {
    return {
        type: AppTypeKeys.SETT_SPRAK,
        valgtSprak,
    };
}

export {
    AppTypeKeys,
    AppActionTypes,
    appForrigeSteg,
    appNesteSteg,
    appEndreStatus,
    appStart,
    appGaaTilSteg,
    appSettSteg,
    appSettHarForsoktNesteSteg,
    appSettSprak,
    appVelgSprak,
    appPingOk,
    IAppGaaTilSteg,
    IAppSettSprak,
};
