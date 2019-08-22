import {
    BarnehageplassVerdier,
    FeltTyper,
    IArbeidIUtlandet,
    IBarnehageplass,
    IFamilieforhold,
    IFelt,
    ITilknytningTilUtland,
    IUtenlandskeYtelser,
    IUtenlandskKontantstotte,
    Stegnavn,
    Svar,
    TilknytningTilUtlandVerdier,
    ValideringsStatus,
} from './types';

function harListeMedFeltFeil(feltForSteg: FeltTyper[]): boolean {
    return feltForSteg.reduce((acc: boolean, felt: FeltTyper) => {
        return acc || felt.valideringsStatus !== ValideringsStatus.OK;
    }, false);
}

function* sjekkValideringForSteg(stegnavn: Stegnavn, soknadState: any) {
    return harListeMedFeltFeil(Object.values(soknadState[stegnavn]));
}

function* sjekkValideringForArbeidIUtlandet(
    familieforhold: IFamilieforhold,
    arbeidIUtlandet: IArbeidIUtlandet
) {
    let harFeil =
        arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.valideringsStatus !==
        ValideringsStatus.OK;

    if (arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkelForklaring.valideringsStatus !==
                ValideringsStatus.OK;
    }

    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.valideringsStatus !==
                ValideringsStatus.OK;

        if (arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.verdi === Svar.JA) {
            harFeil =
                harFeil ||
                arbeidIUtlandet.arbeiderAnnenForelderIUtlandetForklaring.valideringsStatus !==
                    ValideringsStatus.OK;
        }
    }

    return harFeil;
}

const gyldigeVerdier = (felt: FeltTyper): boolean => {
    return (
        felt.valideringsStatus === ValideringsStatus.OK ||
        felt.valideringsStatus === ValideringsStatus.ADVARSEL
    );
};

function* sjekkValideringForBarnehageplass(barnehageplass: IBarnehageplass) {
    const barnehageplassStatus: BarnehageplassVerdier = barnehageplass.barnBarnehageplassStatus
        .verdi as BarnehageplassVerdier;

    if (barnehageplass.harBarnehageplass.verdi !== Svar.UBESVART) {
        switch (barnehageplassStatus) {
            case BarnehageplassVerdier.garIkkeIBarnehage:
                return;

            case BarnehageplassVerdier.harBarnehageplass:
                if (
                    gyldigeVerdier(barnehageplass.harBarnehageplassKommune) &&
                    gyldigeVerdier(barnehageplass.harBarnehageplassDato) &&
                    gyldigeVerdier(barnehageplass.harBarnehageplassAntallTimer)
                ) {
                    return;
                }
                break;

            case BarnehageplassVerdier.skalBegynneIBarnehage:
                if (
                    gyldigeVerdier(barnehageplass.skalBegynneIBarnehageKommune) &&
                    gyldigeVerdier(barnehageplass.skalBegynneIBarnehageDato) &&
                    gyldigeVerdier(barnehageplass.skalBegynneIBarnehageAntallTimer)
                ) {
                    return;
                }
                break;

            case BarnehageplassVerdier.skalSlutteIBarnehage:
                if (
                    gyldigeVerdier(barnehageplass.skalSlutteIBarnehageKommune) &&
                    gyldigeVerdier(barnehageplass.skalSlutteIBarnehageDato) &&
                    gyldigeVerdier(barnehageplass.skalSlutteIBarnehageAntallTimer) &&
                    gyldigeVerdier(barnehageplass.skalSlutteIBarnehageVedlegg)
                ) {
                    return;
                }
                break;

            case BarnehageplassVerdier.harSluttetIBarnehage:
                if (
                    gyldigeVerdier(barnehageplass.harSluttetIBarnehageKommune) &&
                    gyldigeVerdier(barnehageplass.harSluttetIBarnehageDato) &&
                    gyldigeVerdier(barnehageplass.harSluttetIBarnehageAntallTimer) &&
                    gyldigeVerdier(barnehageplass.harSluttetIBarnehageVedlegg)
                ) {
                    return;
                }
                break;

            default:
                return harListeMedFeltFeil(Object.values(barnehageplass));
        }
    }

    return harListeMedFeltFeil(Object.values(barnehageplass));
}

function* sjekkValideringForFamilieforhold(familieforhold: IFamilieforhold) {
    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.NEI) {
        return false;
    } else {
        return harListeMedFeltFeil(Object.values(familieforhold));
    }
}

function* sjekkValideringForUtenlandskeYtelser(
    familieforhold: IFamilieforhold,
    utenlandsYtelser: IUtenlandskeYtelser
) {
    let harFeil =
        utenlandsYtelser.mottarYtelserFraUtland.valideringsStatus !== ValideringsStatus.OK;

    if (utenlandsYtelser.mottarYtelserFraUtland.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            utenlandsYtelser.mottarYtelserFraUtlandForklaring.valideringsStatus !==
                ValideringsStatus.OK;
    }

    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            utenlandsYtelser.mottarAnnenForelderYtelserFraUtland.valideringsStatus !==
                ValideringsStatus.OK;

        if (utenlandsYtelser.mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA) {
            harFeil =
                harFeil ||
                utenlandsYtelser.mottarAnnenForelderYtelserFraUtlandForklaring.valideringsStatus !==
                    ValideringsStatus.OK;
        }
    }

    return harFeil;
}

function* sjekkValideringForTilknytningTilUtland(
    tilknytningTilUtland: ITilknytningTilUtland,
    familieforhold: IFamilieforhold
) {
    let harFeil = !gyldigeVerdier(tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar);

    if (
        tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi ===
            TilknytningTilUtlandVerdier.jaIEOS ||
        tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi ===
            TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS
    ) {
        harFeil =
            harFeil ||
            tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.valideringsStatus !==
                ValideringsStatus.OK;
    }

    if (familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            !gyldigeVerdier(tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar);

        if (
            tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi ===
                TilknytningTilUtlandVerdier.jaIEOS ||
            tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi ===
                TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS
        ) {
            harFeil =
                harFeil ||
                tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring
                    .valideringsStatus !== ValideringsStatus.OK;
        }
    }

    return harFeil;
}

function* sjekkValideringForUtenlandskKontantstotte(
    utenlandskKontantstotte: IUtenlandskKontantstotte
) {
    let harFeil =
        utenlandskKontantstotte.mottarKontantstotteFraUtlandet.valideringsStatus !==
        ValideringsStatus.OK;

    if (utenlandskKontantstotte.mottarKontantstotteFraUtlandet.verdi === Svar.JA) {
        harFeil =
            harFeil ||
            utenlandskKontantstotte.mottarKontantstotteFraUtlandetTilleggsinfo.valideringsStatus !==
                ValideringsStatus.OK;
    }

    return harFeil;
}

export {
    sjekkValideringForSteg,
    sjekkValideringForArbeidIUtlandet,
    sjekkValideringForBarnehageplass,
    sjekkValideringForFamilieforhold,
    sjekkValideringForTilknytningTilUtland,
    sjekkValideringForUtenlandskeYtelser,
    sjekkValideringForUtenlandskKontantstotte,
};
