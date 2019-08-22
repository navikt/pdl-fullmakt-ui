import {
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    IFelt,
    IVedleggFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
    tilknytningTilUtlandFeltnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
    veiledningFeltnavn,
} from './types';
import {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    harBekreftetOppsummering,
    harBekreftetVeiledning,
    harFyltInnDato,
    harFyltInnFodselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harLastetOppVedlegg,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
} from './validators';

type ValiderIFelt = (felt: IFelt) => IFelt;
type ValiderIVedleggFelt = (felt: IVedleggFelt) => IVedleggFelt;

export type ValideringsFunksjon = ValiderIFelt | ValiderIVedleggFelt;

interface IValideringsConfig {
    arbeidIUtlandet: { [felt in arbeidIUtlandetFeltnavn]: ValideringsFunksjon[] };
    barnehageplass: { [felt in barnehageplassFeltnavn]: ValideringsFunksjon[] };
    familieforhold: { [felt in familieforholdFeltnavn]: ValideringsFunksjon[] };
    kravTilSoker: { [felt in kravTilSokerFeltnavn]: ValideringsFunksjon[] };
    mineBarn: { [felt in minebarnFeltnavn]: ValideringsFunksjon[] };
    utenlandskeYtelser: { [felt in utenlandskeYtelserFeltnavn]: ValideringsFunksjon[] };
    oppsummering: { [felt in oppsummeringFeltnavn]: ValideringsFunksjon[] };
    utenlandskKontantstotte: { [felt in utenlandskKontantstotteFeltnavn]: ValideringsFunksjon[] };
    tilknytningTilUtland: { [felt in tilknytningTilUtlandFeltnavn]: ValideringsFunksjon[] };
    veiledning: { [felt in veiledningFeltnavn]: ValideringsFunksjon[] };
}

const valideringsConfig: IValideringsConfig = {
    arbeidIUtlandet: {
        arbeiderAnnenForelderIUtlandet: [harSvartMedFeilmelding],
        arbeiderAnnenForelderIUtlandetForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        arbeiderIUtlandetEllerKontinentalsokkel: [harSvartMedFeilmelding],
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    barnehageplass: {
        barnBarnehageplassStatus: [harSvartBarnehageplassVerdiMedFeilmelding],
        harBarnehageplass: [harSvartMedFeilmelding],
        harBarnehageplassAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harBarnehageplassDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harBarnehageplassKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        harSluttetIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        harSluttetIBarnehageKommune: [harSvartTekstMedFeilmelding],
        harSluttetIBarnehageVedlegg: [harLastetOppVedlegg],
        skalBegynneIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalBegynneIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalBegynneIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageAntallTimer: [
            harSvartTekstMedFeilmelding,
            harFyltInnTall,
            harFyltInnGyldigAntallTimer,
        ],
        skalSlutteIBarnehageDato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        skalSlutteIBarnehageKommune: [harSvartTekstMedFeilmelding],
        skalSlutteIBarnehageVedlegg: [harLastetOppVedlegg],
    },
    familieforhold: {
        annenForelderFodselsnummer: [harSvartTekstMedFeilmelding, harFyltInnFodselsnummer],
        annenForelderNavn: [harFyltInnNavn],
        borForeldreneSammenMedBarnet: [harSvartMedFeilmelding],
    },
    kravTilSoker: {
        barnIkkeHjemme: [harSvartJaMedFeilmelding],
        borSammenMedBarnet: [harSvartJaMedFeilmelding],
        ikkeAvtaltDeltBosted: [harSvartJaMedFeilmelding],
        skalBoMedBarnetINorgeNesteTolvMaaneder: [harSvartJaMedFeilmelding],
    },
    mineBarn: {
        erFlerling: [svarUtenValidering],
        fodselsdato: [harSvartTekstMedFeilmelding, harFyltInnDato],
        navn: [harFyltInnNavn],
    },
    oppsummering: {
        bekreftelse: [harBekreftetOppsummering],
    },
    tilknytningTilUtland: {
        annenForelderBoddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            annenForelderHarIkkeSvartNeiTilknytningTilUtland,
        ],
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        boddEllerJobbetINorgeMinstFemAar: [
            harSvartTilknytningTilUtlandVerdiMedFeilmelding,
            sokerHarIkkeSvartNeiTilknytningTilUtland,
        ],
        boddEllerJobbetINorgeMinstFemAarForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskKontantstotte: {
        mottarKontantstotteFraUtlandet: [harSvartMedFeilmelding],
        mottarKontantstotteFraUtlandetTilleggsinfo: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    utenlandskeYtelser: {
        mottarAnnenForelderYtelserFraUtland: [harSvartMedFeilmelding],
        mottarAnnenForelderYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
        mottarYtelserFraUtland: [harSvartMedFeilmelding],
        mottarYtelserFraUtlandForklaring: [
            harSvartTekstMedFeilmelding,
            harSvartTekstUnderAntallTegnMedFeilmelding,
        ],
    },
    veiledning: {
        bekreftelse: [harBekreftetVeiledning],
    },
};

export default valideringsConfig;
