import { SoknadActionTypes, SoknadTypeKeys } from './actions';
import {
    BarnehageplassVerdier,
    ISoknadState,
    IVedleggFelt,
    Svar,
    TilknytningTilUtlandVerdier,
    ValideringsStatus,
} from './types';

const standardSvarInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: Svar.UBESVART,
};

const standardStringInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: '',
};

const standardBarnehageplassVerdiInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: BarnehageplassVerdier.Ubesvart,
};

const standardTilknytningTilUtlandVerdiInitialFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: TilknytningTilUtlandVerdier.Ubesvart,
};

const standardVedleggInitialFelt: IVedleggFelt = {
    feilmeldingsNokkel: '',
    valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
    verdi: [],
};

const initialState: ISoknadState = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: standardSvarInitialFelt,
        arbeiderAnnenForelderIUtlandetForklaring: standardStringInitialFelt,
        arbeiderIUtlandetEllerKontinentalsokkel: standardSvarInitialFelt,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: standardStringInitialFelt,
    },
    barnehageplass: {
        barnBarnehageplassStatus: standardBarnehageplassVerdiInitialFelt,
        harBarnehageplass: standardSvarInitialFelt,
        harBarnehageplassAntallTimer: standardStringInitialFelt,
        harBarnehageplassDato: standardStringInitialFelt,
        harBarnehageplassKommune: standardStringInitialFelt,
        harSluttetIBarnehageAntallTimer: standardStringInitialFelt,
        harSluttetIBarnehageDato: standardStringInitialFelt,
        harSluttetIBarnehageKommune: standardStringInitialFelt,
        harSluttetIBarnehageVedlegg: standardVedleggInitialFelt,
        skalBegynneIBarnehageAntallTimer: standardStringInitialFelt,
        skalBegynneIBarnehageDato: standardStringInitialFelt,
        skalBegynneIBarnehageKommune: standardStringInitialFelt,
        skalSlutteIBarnehageAntallTimer: standardStringInitialFelt,
        skalSlutteIBarnehageDato: standardStringInitialFelt,
        skalSlutteIBarnehageKommune: standardStringInitialFelt,
        skalSlutteIBarnehageVedlegg: standardVedleggInitialFelt,
    },
    familieforhold: {
        annenForelderFodselsnummer: standardStringInitialFelt,
        annenForelderNavn: standardStringInitialFelt,
        borForeldreneSammenMedBarnet: standardSvarInitialFelt,
    },
    kravTilSoker: {
        barnIkkeHjemme: standardSvarInitialFelt,
        borSammenMedBarnet: standardSvarInitialFelt,
        ikkeAvtaltDeltBosted: standardSvarInitialFelt,
        skalBoMedBarnetINorgeNesteTolvMaaneder: standardSvarInitialFelt,
    },
    mineBarn: {
        erFlerling: standardSvarInitialFelt,
        fodselsdato: standardStringInitialFelt,
        navn: standardStringInitialFelt,
    },
    oppsummering: {
        bekreftelse: standardSvarInitialFelt,
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: standardTilknytningTilUtlandVerdiInitialFelt,
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: standardStringInitialFelt,
        boddEllerJobbetINorgeMinstFemAar: standardTilknytningTilUtlandVerdiInitialFelt,
        boddEllerJobbetINorgeMinstFemAarForklaring: standardStringInitialFelt,
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: standardSvarInitialFelt,
        mottarKontantstotteFraUtlandetTilleggsinfo: standardStringInitialFelt,
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: standardSvarInitialFelt,
        mottarAnnenForelderYtelserFraUtlandForklaring: standardStringInitialFelt,
        mottarYtelserFraUtland: standardSvarInitialFelt,
        mottarYtelserFraUtlandForklaring: standardStringInitialFelt,
    },
    veiledning: {
        bekreftelse: standardSvarInitialFelt,
    },
};

function soknadReducer(state = initialState, action: SoknadActionTypes) {
    let felt;
    switch (action.type) {
        case SoknadTypeKeys.SETT_FELT:
            return {
                ...state,
                [action.stegnavn]: {
                    ...state[action.stegnavn],
                    [action.feltnavn]: action.felt,
                },
            };
        case SoknadTypeKeys.LEGG_TIL_VEDLEGG:
            felt = state[action.stegnavn][action.feltnavn] as IVedleggFelt;
            return {
                ...state,
                [action.stegnavn]: {
                    ...state[action.stegnavn],
                    [action.feltnavn]: {
                        ...felt,
                        verdi: felt.verdi.concat(action.vedlegg),
                    },
                },
            };
        case SoknadTypeKeys.FJERN_VEDLEGG:
            felt = state[action.stegnavn][action.feltnavn] as IVedleggFelt;
            return {
                ...state,
                [action.stegnavn]: {
                    ...state[action.stegnavn],
                    [action.feltnavn]: {
                        ...felt,
                        verdi: felt.verdi.filter(v => v.filreferanse !== action.filreferanse),
                    },
                },
            };
        case SoknadTypeKeys.ERSTATT_VEDLEGG:
            felt = state[action.stegnavn][action.feltnavn] as IVedleggFelt;
            return {
                ...state,
                [action.stegnavn]: {
                    ...state[action.stegnavn],
                    [action.feltnavn]: {
                        ...felt,
                        verdi: felt.verdi.map(v =>
                            v.filreferanse === action.filreferanse ? action.vedlegg : v
                        ),
                    },
                },
            };
        default:
            return state;
    }
}

export { soknadReducer };
