import { ANTALL_LOVLIGE_TEGN_I_TEKSTFELT } from '../common/utils';
import {
    BarnehageplassVerdier,
    FeltTyper,
    IFelt,
    IVedleggFelt,
    Svar,
    TilknytningTilUtlandVerdier,
    ValideringsStatus,
} from './types';

function ok(felt: IFelt): IFelt;
function ok(felt: IVedleggFelt): IVedleggFelt;
function ok(felt: FeltTyper) {
    return {
        feilmeldingsNokkel: '',
        valideringsStatus: ValideringsStatus.OK,
        verdi: felt.verdi,
    };
}

function advarsel(felt: IFelt, advarselNokkel: string): IFelt;
function advarsel(felt: IVedleggFelt, advarselNokkel: string): IVedleggFelt;
function advarsel(felt: FeltTyper, advarselNokkel: string) {
    return {
        feilmeldingsNokkel: advarselNokkel,
        valideringsStatus: ValideringsStatus.ADVARSEL,
        verdi: felt.verdi,
    };
}

function feil(felt: IFelt, feilmeldingsNokkel: string): IFelt;
function feil(felt: IVedleggFelt, feilmeldingsNokkel: string): IVedleggFelt;
function feil(felt: FeltTyper, feilmeldingsNokkel: string) {
    return {
        feilmeldingsNokkel,
        valideringsStatus: ValideringsStatus.FEIL,
        verdi: felt.verdi,
    };
}

const harSvart = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi !== Svar.UBESVART ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartBarnehageplassVerdiMedFeilmelding = (felt: IFelt): IFelt => {
    return felt.verdi !== BarnehageplassVerdier.Ubesvart
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.feilmelding');
};

const harSvartTilknytningTilUtlandVerdiMedFeilmelding = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.Ubesvart
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.feilmelding');
};

const harSvartJa = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi === Svar.JA ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartTekst = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi.length > 0 ? ok(felt) : feil(felt, feilmeldingsNokkel);
};

const harSvartTekstUnderAntallTegn = (felt: IFelt, feilmeldingsNokkel: string): IFelt => {
    return felt.verdi.length <= ANTALL_LOVLIGE_TEGN_I_TEKSTFELT
        ? ok(felt)
        : feil(felt, feilmeldingsNokkel);
};

const harFyltInnNavn = (felt: IFelt): IFelt => {
    return felt.verdi.replace(' ', '').length > 0
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.navn');
};

const harFyltInnDato = (felt: IFelt): IFelt => {
    const datoer = felt.verdi
        .replace('og', ',')
        .replace(/ /g, '')
        .split(',');
    for (const dato of datoer) {
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dato)) {
            return feil(felt, 'feilmelding.generell.dato');
        }
    }
    return ok(felt);
};

const harFyltInnFodselsnummer = (felt: IFelt): IFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.fodselsnummer');
};

const harFyltInnTall = (felt: IFelt): IFelt => {
    return /^[+-]?\d+(\.\d+)?$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'feilmelding.generell.tall');
};

const harFyltInnGyldigAntallTimer = (felt: IFelt): IFelt => {
    const timer = parseFloat(felt.verdi);
    switch (true) {
        case timer >= 0 && timer <= 33:
            return ok(felt);
        case timer >= 33 && timer <= 50:
            return advarsel(felt, 'advarsel.barnehageplass.timerIBarnehage');
        default:
            return feil(felt, 'feilmelding.barnehageplass.timerIBarnehage');
    }
};

const sokerHarIkkeSvartNeiTilknytningTilUtland = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.nei
        ? ok(felt)
        : advarsel(felt, 'tilknytningTilUtland.advarsel.nei.soker');
};

const annenForelderHarIkkeSvartNeiTilknytningTilUtland = (felt: IFelt): IFelt => {
    return felt.verdi !== TilknytningTilUtlandVerdier.nei
        ? ok(felt)
        : advarsel(felt, 'tilknytningTilUtland.advarsel.nei.annenForelder');
};

const harBekreftetOppsummering = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'oppsummering.bekreftelse.feilmelding');

const harBekreftetVeiledning = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'veiledningsside.bekreftelse.feilmelding');

const harSvartMedFeilmelding = (felt: IFelt): IFelt =>
    harSvart(felt, 'feilmelding.generell.feilmelding');

const harSvartJaMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartJa(felt, 'feilmelding.generell.feilmeldingCheckbox');

const harSvartTekstMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekst(felt, 'feilmelding.generell.feilmelding');

const harSvartTekstUnderAntallTegnMedFeilmelding = (felt: IFelt): IFelt =>
    harSvartTekstUnderAntallTegn(felt, 'feilmelding.generell.forMangeTegn');

const harLastetOppVedlegg = (felt: IVedleggFelt): IVedleggFelt => {
    return !!felt.verdi.length ? ok(felt) : feil(felt, 'feilmelding.generell.vedlegg.mangler');
};

const svarUtenValidering = (felt: IFelt): IFelt => ok(felt);

export {
    annenForelderHarIkkeSvartNeiTilknytningTilUtland,
    harBekreftetOppsummering,
    harBekreftetVeiledning,
    harFyltInnDato,
    harFyltInnFodselsnummer,
    harFyltInnGyldigAntallTimer,
    harFyltInnNavn,
    harFyltInnTall,
    harLastetOppVedlegg,
    harSvart,
    harSvartBarnehageplassVerdiMedFeilmelding,
    harSvartJa,
    harSvartJaMedFeilmelding,
    harSvartMedFeilmelding,
    harSvartTekstMedFeilmelding,
    harSvartTekstUnderAntallTegnMedFeilmelding,
    harSvartTilknytningTilUtlandVerdiMedFeilmelding,
    sokerHarIkkeSvartNeiTilknytningTilUtland,
    svarUtenValidering,
};
