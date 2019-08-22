import { Action } from 'redux';
import { IVedlegg } from '../vedlegg/types';
import { Feltnavn, FeltTyper, Stegnavn } from './types';

enum SoknadTypeKeys {
    NESTE_STEG = 'SOKNAD_NESTE_STEG',
    NULLSTILL_NESTE_STEG = 'SOKNAD_NULLSTILL_NESTE_STEG',
    SETT_FELT = 'SOKNAD_SETT_FELT',
    VALIDER_STEG = 'SOKNAD_VALIDER_STEG',
    VALIDER_FELT = 'SOKNAD_VALIDER_FELT',
    LEGG_TIL_VEDLEGG = 'SOKNAD_LEGG_TIL_VEDLEGG',
    FJERN_VEDLEGG = 'SOKNAD_FJERN_VEDLEGG',
    ERSTATT_VEDLEGG = 'SOKNAD_ERSTATT_VEDLEGG',
}

type SoknadActionTypes = ISoknadValiderFelt &
    ISoknadValiderSteg &
    ISoknadNesteSteg &
    ISoknadNullstillNesteSteg &
    ISoknadLeggTilVedlegg &
    ISoknadFjernVedlegg &
    ISoknadErstattVedlegg &
    ISoknadSettFelt;

interface ISoknadValiderFelt extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.VALIDER_FELT;
    verdi: any;
}

interface ISoknadValiderSteg extends Action {
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.VALIDER_STEG;
}

interface ISoknadSettFelt extends Action {
    felt: FeltTyper;
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.SETT_FELT;
}

interface ISoknadNesteSteg extends Action {
    type: SoknadTypeKeys.NESTE_STEG;
}

interface ISoknadNullstillNesteSteg extends Action {
    type: SoknadTypeKeys.NULLSTILL_NESTE_STEG;
}

interface ISoknadLeggTilVedlegg extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.LEGG_TIL_VEDLEGG;
    vedlegg: IVedlegg;
}

interface ISoknadFjernVedlegg extends Action {
    feltnavn: Feltnavn;
    filreferanse: string;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.FJERN_VEDLEGG;
}

interface ISoknadErstattVedlegg extends Action {
    feltnavn: Feltnavn;
    filreferanse: string;
    stegnavn: Stegnavn;
    type: SoknadTypeKeys.ERSTATT_VEDLEGG;
    vedlegg: IVedlegg;
}

function soknadValiderFelt(stegnavn: Stegnavn, feltnavn: Feltnavn, verdi: any): ISoknadValiderFelt {
    return {
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.VALIDER_FELT,
        verdi,
    };
}

function soknadValiderSteg(stegnavn: Stegnavn): ISoknadValiderSteg {
    return {
        stegnavn,
        type: SoknadTypeKeys.VALIDER_STEG,
    };
}

function soknadSettFelt(stegnavn: Stegnavn, feltnavn: Feltnavn, felt: FeltTyper): ISoknadSettFelt {
    return {
        felt,
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.SETT_FELT,
    };
}

function soknadNesteSteg(): ISoknadNesteSteg {
    return {
        type: SoknadTypeKeys.NESTE_STEG,
    };
}

function soknadNullstillNesteSteg(): ISoknadNullstillNesteSteg {
    return {
        type: SoknadTypeKeys.NULLSTILL_NESTE_STEG,
    };
}

function soknadLeggTilVedlegg(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    vedlegg: IVedlegg
): ISoknadLeggTilVedlegg {
    return {
        feltnavn,
        stegnavn,
        type: SoknadTypeKeys.LEGG_TIL_VEDLEGG,
        vedlegg,
    };
}

function soknadFjernVedlegg(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    filreferanse: string
): ISoknadFjernVedlegg {
    return {
        feltnavn,
        filreferanse,
        stegnavn,
        type: SoknadTypeKeys.FJERN_VEDLEGG,
    };
}

function soknadErstattVedlegg(
    stegnavn: Stegnavn,
    feltnavn: Feltnavn,
    filreferanse: string,
    vedlegg: IVedlegg
): ISoknadErstattVedlegg {
    return {
        feltnavn,
        filreferanse,
        stegnavn,
        type: SoknadTypeKeys.ERSTATT_VEDLEGG,
        vedlegg,
    };
}

export {
    ISoknadValiderFelt,
    ISoknadValiderSteg,
    SoknadActionTypes,
    soknadErstattVedlegg,
    soknadFjernVedlegg,
    soknadLeggTilVedlegg,
    soknadNesteSteg,
    soknadNullstillNesteSteg,
    soknadSettFelt,
    SoknadTypeKeys,
    soknadValiderFelt,
    soknadValiderSteg,
};
