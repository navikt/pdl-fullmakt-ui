import { IVedlegg } from '../vedlegg/types';

enum Svar {
    JA = 'JA',
    NEI = 'NEI',
    UBESVART = 'UBESVART',
}

enum BarnehageplassVerdier {
    garIkkeIBarnehage = 'garIkkeIBarnehage',
    harBarnehageplass = 'harBarnehageplass',
    harSluttetIBarnehage = 'harSluttetIBarnehage',
    skalBegynneIBarnehage = 'skalBegynneIBarnehage',
    skalSlutteIBarnehage = 'skalSlutteIBarnehage',
    Ubesvart = 'Ubesvart',
}

enum TilknytningTilUtlandVerdier {
    jaINorge = 'jaINorge',
    jaIEOS = 'jaIEOS',
    jaLeggerSammenPerioderEOS = 'jaLeggerSammenPerioderEOS',
    nei = 'nei',
    Ubesvart = 'Ubesvart',
}

enum ValideringsStatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

interface IFelt {
    feilmeldingsNokkel: string;
    valideringsStatus: ValideringsStatus;
    verdi: Svar | BarnehageplassVerdier | TilknytningTilUtlandVerdier | string;
}

interface IVedleggFelt {
    feilmeldingsNokkel: string;
    valideringsStatus: ValideringsStatus;
    verdi: IVedlegg[];
}

type FeltTyper = IFelt | IVedleggFelt;

function isIVedleggFelt(felt: FeltTyper): felt is IVedleggFelt {
    return Array.isArray((felt as IVedleggFelt).verdi);
}

interface ISteg {
    [key: string]: FeltTyper;
}

interface ISoknadState {
    readonly veiledning: IVeiledning;
    readonly mineBarn: IMineBarn;
    readonly familieforhold: IFamilieforhold;
    readonly arbeidIUtlandet: IArbeidIUtlandet;
    readonly barnehageplass: IBarnehageplass;
    readonly utenlandskKontantstotte: IUtenlandskKontantstotte;
    readonly kravTilSoker: IKravTilSoker;
    readonly utenlandskeYtelser: IUtenlandskeYtelser;
    readonly oppsummering: IOppsummering;
    readonly tilknytningTilUtland: ITilknytningTilUtland;
}

interface IVeiledning extends ISteg {
    readonly bekreftelse: IFelt;
}

interface IMineBarn extends ISteg {
    readonly erFlerling: IFelt;
    readonly fodselsdato: IFelt;
    readonly navn: IFelt;
}

interface IFamilieforhold extends ISteg {
    readonly borForeldreneSammenMedBarnet: IFelt;
    readonly annenForelderNavn: IFelt;
    readonly annenForelderFodselsnummer: IFelt;
}

interface IUtenlandskKontantstotte extends ISteg {
    readonly mottarKontantstotteFraUtlandet: IFelt;
    readonly mottarKontantstotteFraUtlandetTilleggsinfo: IFelt;
}

interface IBarnehageplass extends ISteg {
    readonly harBarnehageplass: IFelt;
    readonly barnBarnehageplassStatus: IFelt;
    readonly harSluttetIBarnehageAntallTimer: IFelt;
    readonly harSluttetIBarnehageDato: IFelt;
    readonly harSluttetIBarnehageKommune: IFelt;
    readonly harSluttetIBarnehageVedlegg: IVedleggFelt;
    readonly skalBegynneIBarnehageAntallTimer: IFelt;
    readonly skalBegynneIBarnehageDato: IFelt;
    readonly skalBegynneIBarnehageKommune: IFelt;
    readonly skalSlutteIBarnehageAntallTimer: IFelt;
    readonly skalSlutteIBarnehageDato: IFelt;
    readonly skalSlutteIBarnehageKommune: IFelt;
    readonly skalSlutteIBarnehageVedlegg: IVedleggFelt;
    readonly harBarnehageplassAntallTimer: IFelt;
    readonly harBarnehageplassDato: IFelt;
    readonly harBarnehageplassKommune: IFelt;
}

interface IKravTilSoker extends ISteg {
    readonly borSammenMedBarnet: IFelt;
    readonly barnIkkeHjemme: IFelt;
    readonly ikkeAvtaltDeltBosted: IFelt;
    readonly skalBoMedBarnetINorgeNesteTolvMaaneder: IFelt;
}

interface IArbeidIUtlandet extends ISteg {
    readonly arbeiderIUtlandetEllerKontinentalsokkel: IFelt;
    readonly arbeiderIUtlandetEllerKontinentalsokkelForklaring: IFelt;
    readonly arbeiderAnnenForelderIUtlandet: IFelt;
    readonly arbeiderAnnenForelderIUtlandetForklaring: IFelt;
}

interface IUtenlandskeYtelser extends ISteg {
    readonly mottarYtelserFraUtland: IFelt;
    readonly mottarYtelserFraUtlandForklaring: IFelt;
    readonly mottarAnnenForelderYtelserFraUtland: IFelt;
    readonly mottarAnnenForelderYtelserFraUtlandForklaring: IFelt;
}

interface IOppsummering extends ISteg {
    readonly bekreftelse: IFelt;
}

interface ITilknytningTilUtland extends ISteg {
    readonly boddEllerJobbetINorgeMinstFemAar: IFelt;
    readonly boddEllerJobbetINorgeMinstFemAarForklaring: IFelt;
    readonly annenForelderBoddEllerJobbetINorgeMinstFemAar: IFelt;
    readonly annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring: IFelt;
}

type veiledningFeltnavn = keyof IVeiledning;
type minebarnFeltnavn = keyof IMineBarn;
type familieforholdFeltnavn = keyof IFamilieforhold;
type barnehageplassFeltnavn = keyof IBarnehageplass;
type kravTilSokerFeltnavn = keyof IKravTilSoker;
type utenlandskeYtelserFeltnavn = keyof IUtenlandskeYtelser;
type arbeidIUtlandetFeltnavn = keyof IArbeidIUtlandet;
type utenlandskKontantstotteFeltnavn = keyof IUtenlandskKontantstotte;
type oppsummeringFeltnavn = keyof IOppsummering;
type tilknytningTilUtlandFeltnavn = keyof ITilknytningTilUtland;

type Stegnavn = keyof ISoknadState;
type Feltnavn =
    | veiledningFeltnavn
    | minebarnFeltnavn
    | familieforholdFeltnavn
    | barnehageplassFeltnavn
    | kravTilSokerFeltnavn
    | arbeidIUtlandetFeltnavn
    | utenlandskeYtelserFeltnavn
    | utenlandskKontantstotteFeltnavn
    | oppsummeringFeltnavn
    | tilknytningTilUtlandFeltnavn;

export {
    veiledningFeltnavn,
    minebarnFeltnavn,
    familieforholdFeltnavn,
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    kravTilSokerFeltnavn,
    utenlandskeYtelserFeltnavn,
    oppsummeringFeltnavn,
    tilknytningTilUtlandFeltnavn,
    BarnehageplassVerdier,
    TilknytningTilUtlandVerdier,
    Stegnavn,
    Feltnavn,
    IArbeidIUtlandet,
    IMineBarn,
    IBarnehageplass,
    IFamilieforhold,
    IUtenlandskKontantstotte,
    IKravTilSoker,
    IUtenlandskeYtelser,
    ITilknytningTilUtland,
    ISoknadState,
    Svar,
    IFelt,
    IVeiledning,
    IVedleggFelt,
    utenlandskKontantstotteFeltnavn,
    ValideringsStatus,
    FeltTyper,
    isIVedleggFelt,
};
