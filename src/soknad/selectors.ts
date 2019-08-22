import { IRootState } from '../rootReducer';
import {
    Feltnavn,
    IArbeidIUtlandet,
    IBarnehageplass,
    IFamilieforhold,
    IFelt,
    IKravTilSoker,
    ISoknadState,
    IUtenlandskKontantstotte,
    IVedleggFelt,
    Stegnavn,
} from './types';

function selectFamilieforhold(state: IRootState): IFamilieforhold {
    return state.soknad.familieforhold;
}

function selectBarnehageplass(state: IRootState): IBarnehageplass {
    return state.soknad.barnehageplass;
}

function selectUtenlandskKontantstotte(state: IRootState): IUtenlandskKontantstotte {
    return state.soknad.utenlandskKontantstotte;
}

function selectKravTilSoker(state: IRootState): IKravTilSoker {
    return state.soknad.kravTilSoker;
}

function selectMineBarn(state: IRootState) {
    return state.soknad.mineBarn;
}

function selectArbeidIUtlandet(state: IRootState): IArbeidIUtlandet {
    return state.soknad.arbeidIUtlandet;
}

function selectYtelserFraUtland(state: IRootState) {
    return state.soknad.utenlandskeYtelser;
}

function selectTilknytningTilUtland(state: IRootState) {
    return state.soknad.tilknytningTilUtland;
}

function selectSoknad(state: IRootState): ISoknadState {
    return state.soknad;
}

function selectFelt(state: IRootState, stegnavn: Stegnavn, feltnavn: Feltnavn): IFelt;
function selectFelt(state: IRootState, stegnavn: Stegnavn, feltnavn: Feltnavn): IVedleggFelt;
function selectFelt(state: IRootState, stegnavn: Stegnavn, feltnavn: Feltnavn) {
    return state.soknad[stegnavn][feltnavn];
}

export {
    selectArbeidIUtlandet,
    selectBarnehageplass,
    selectFamilieforhold,
    selectUtenlandskKontantstotte,
    selectKravTilSoker,
    selectYtelserFraUtland,
    selectTilknytningTilUtland,
    selectSoknad,
    selectMineBarn,
    selectFelt,
};
