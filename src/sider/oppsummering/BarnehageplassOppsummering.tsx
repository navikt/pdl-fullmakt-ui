import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { BarnehageplassVerdier, IBarnehageplass, ValideringsStatus } from '../../soknad/types';
import { stegConfig } from '../../stegConfig';
import { JaNeiSvar } from './JaNeiSvar';
import OppsummeringsAdvarsel from './OppsummeringsAdvarsel';
import OppsummeringSteg from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';
import { VedleggSvar } from './VedleggSvar';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    brukFlertall: boolean;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    brukFlertall,
}) => {
    let barnBarnehageplassStatusSvar = 'Ubesvart';

    switch (barnehageplass.barnBarnehageplassStatus.verdi as BarnehageplassVerdier) {
        case BarnehageplassVerdier.garIkkeIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.garIkkeIBarnehage';
            break;
        case BarnehageplassVerdier.harBarnehageplass:
            barnBarnehageplassStatusSvar = 'barnehageplass.harBarnehageplass';
            break;
        case BarnehageplassVerdier.harSluttetIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.harSluttetIBarnehage';
            break;
        case BarnehageplassVerdier.skalBegynneIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.skalBegynneIBarnehage';
            break;
        case BarnehageplassVerdier.skalSlutteIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.skalSlutteIBarnehage';
            break;
    }

    return (
        <OppsummeringSteg stegIndeks={stegConfig.barnehageplass.stegIndeks}>
            <Element>
                <FormattedMessage id={'barnehageplass.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={
                            brukFlertall
                                ? 'barnehageplass.harPlass.flertall'
                                : 'barnehageplass.harPlass'
                        }
                    />
                }
                svar={<JaNeiSvar verdi={barnehageplass.harBarnehageplass.verdi} />}
            />

            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={
                            brukFlertall
                                ? 'barnehageplass.barnBarnehageplassStatus.flertall'
                                : 'barnehageplass.barnBarnehageplassStatus'
                        }
                    />
                }
                svar={<FormattedMessage id={barnBarnehageplassStatusSvar} />}
            />
            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.harSluttetIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.harSluttetIBarnehage.dato.sporsmal.flertall'
                                        : 'barnehageplass.harSluttetIBarnehage.dato.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal.flertall'
                                        : 'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harSluttetIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageKommune.verdi}
                    />

                    <VedleggSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.vedlegg.sporsmal'}
                            />
                        }
                        vedlegg={barnehageplass.harSluttetIBarnehageVedlegg.verdi}
                    />
                </>
            )}

            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.skalSlutteIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.skalSlutteIBarnehage.dato.sporsmal.flertall'
                                        : 'barnehageplass.skalSlutteIBarnehage.dato.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal.flertall'
                                        : 'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageKommune.verdi}
                    />

                    <VedleggSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.vedlegg.sporsmal'}
                            />
                        }
                        vedlegg={barnehageplass.skalSlutteIBarnehageVedlegg.verdi}
                    />
                </>
            )}
            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.harBarnehageplass && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.harBarnehageplass.dato.sporsmal.flertall'
                                        : 'barnehageplass.harBarnehageplass.dato.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.harBarnehageplassDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.harBarnehageplass.antallTimer.sporsmal.flertall'
                                        : 'barnehageplass.harBarnehageplass.antallTimer.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.harBarnehageplassAntallTimer.verdi}
                    />
                    {barnehageplass.harBarnehageplassAntallTimer.valideringsStatus ===
                        ValideringsStatus.ADVARSEL && (
                        <OppsummeringsAdvarsel
                            meldingsNokkel={
                                brukFlertall
                                    ? 'advarsel.barnehageplass.timerIBarnehage.flertall'
                                    : 'advarsel.barnehageplass.timerIBarnehage'
                            }
                        />
                    )}
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harBarnehageplass.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harBarnehageplassKommune.verdi}
                    />
                </>
            )}

            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.skalBegynneIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.skalBegynneIBarnehage.dato.sporsmal.flertall'
                                        : 'barnehageplass.skalBegynneIBarnehage.dato.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    brukFlertall
                                        ? 'barnehageplass.skalBegynneIBarnehage.antallTimer.sporsmal.flertall'
                                        : 'barnehageplass.skalBegynneIBarnehage.antallTimer.sporsmal'
                                }
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalBegynneIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageKommune.verdi}
                    />
                </>
            )}
        </OppsummeringSteg>
    );
};

export default BarnehageplassOppsummering;
