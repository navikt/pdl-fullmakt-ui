import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IFeil } from '../../common/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { Feltnavn, IFelt, TilknytningTilUtlandVerdier } from '../../soknad/types';

interface IBoddEllerJobbetINorgeSporsmalProps {
    nullstillNeste: () => void;
    settTilknytningTilUtlandVerdiFelt: (
        feltnavn: Feltnavn,
        verdi: TilknytningTilUtlandVerdier
    ) => void;
    settForklaringsFelt: (feltnavn: Feltnavn, verdi: string) => void;
    feltFeil: IFeil | undefined;
    feltVerdi: TilknytningTilUtlandVerdier;
    forklaringFeltFeil: IFeil | undefined;
    forklaringFeltVerdi: IFelt;
    gjelderAnnenForelder: boolean;
    intl: InjectedIntl;
}

const BoddEllerJobbetINorgeSporsmal: React.StatelessComponent<
    IBoddEllerJobbetINorgeSporsmalProps
> = ({
    feltFeil,
    feltVerdi,
    forklaringFeltFeil,
    forklaringFeltVerdi,
    gjelderAnnenForelder,
    intl,
    nullstillNeste,
    settForklaringsFelt,
    settTilknytningTilUtlandVerdiFelt,
}) => {
    const feltNavn = gjelderAnnenForelder
        ? 'annenForelderBoddEllerJobbetINorgeMinstFemAar'
        : 'boddEllerJobbetINorgeMinstFemAar';
    return (
        <form>
            <RadioPanelGruppe
                legend={intl.formatMessage({
                    id: gjelderAnnenForelder
                        ? 'tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.sporsmal'
                        : 'tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.sporsmal',
                })}
                name={feltNavn}
                className={'soknad__inputPanelGruppe'}
                onChange={(evt: {}, value: string) => {
                    settTilknytningTilUtlandVerdiFelt(
                        feltNavn as Feltnavn,
                        value as TilknytningTilUtlandVerdier
                    );
                    nullstillNeste();
                }}
                checked={feltVerdi}
                radios={[
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaINorge' }),
                        value: TilknytningTilUtlandVerdier.jaINorge,
                    },
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaIEOS' }),
                        value: TilknytningTilUtlandVerdier.jaIEOS,
                    },
                    {
                        label: intl.formatMessage({
                            id: gjelderAnnenForelder
                                ? 'tilknytningTilUtland.svar.annenForelder.jaLeggerSammenPerioderEOS'
                                : 'tilknytningTilUtland.svar.soker.jaLeggerSammenPerioderEOS',
                        }),
                        value: TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS,
                    },
                    {
                        label: intl.formatMessage({
                            id: gjelderAnnenForelder
                                ? 'tilknytningTilUtland.svar.annenForelder.nei'
                                : 'tilknytningTilUtland.svar.soker.nei',
                        }),
                        value: TilknytningTilUtlandVerdier.nei,
                    },
                ]}
                feil={feltFeil}
            />

            {(feltVerdi === TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS ||
                feltVerdi === TilknytningTilUtlandVerdier.jaIEOS) && (
                <TilleggsinformasjonInput
                    label={intl.formatMessage({
                        id: 'tilknytningTilUtland.forklaring.hjelpetekst',
                    })}
                    defaultValue={forklaringFeltVerdi}
                    onBlur={(value: string) => {
                        settForklaringsFelt((feltNavn + 'Forklaring') as Feltnavn, value);
                    }}
                    feil={forklaringFeltFeil}
                />
            )}

            {feltVerdi === TilknytningTilUtlandVerdier.nei && (
                <Veileder
                    posisjon={'høyre'}
                    className={'tilknytning-til-utland__advarsel'}
                    tekst={
                        <FormattedMessage
                            id={
                                gjelderAnnenForelder
                                    ? 'tilknytningTilUtland.advarsel.nei.annenForelder'
                                    : 'tilknytningTilUtland.advarsel.nei.soker'
                            }
                        />
                    }
                    type={'advarsel'}
                >
                    <Veilederikon morkBakgrunn={true} />
                </Veileder>
            )}
        </form>
    );
};

export default BoddEllerJobbetINorgeSporsmal;
