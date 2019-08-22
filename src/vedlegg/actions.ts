import { Action } from 'redux';
import { Feltnavn, Stegnavn } from '../soknad/types';

enum VedleggTypeKeys {
    LAST_OPP = 'VEDLEGG_LAST_OPP',
}

interface IVedleggLastOpp extends Action {
    feltnavn: Feltnavn;
    stegnavn: Stegnavn;
    type: VedleggTypeKeys.LAST_OPP;
    filer: File[];
}

function vedleggLastOpp(stegnavn: Stegnavn, feltnavn: Feltnavn, filer: File[]): IVedleggLastOpp {
    return {
        feltnavn,
        filer,
        stegnavn,
        type: VedleggTypeKeys.LAST_OPP,
    };
}

export { vedleggLastOpp, VedleggTypeKeys, IVedleggLastOpp };
