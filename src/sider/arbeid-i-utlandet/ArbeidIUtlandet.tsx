import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import ArbeidIUtlandetIkon from '../../component/Ikoner/ArbeidIUtlandetIkon';
import SideContainer from '../../component/StegSide/StegSide';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { IRootState } from '../../rootReducer';
import { soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectArbeidIUtlandet, selectFamilieforhold } from '../../soknad/selectors';
import { Feltnavn, IArbeidIUtlandet, IFamilieforhold, IFelt, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nullstillNesteSteg: () => void;
    settStringFelt: (feltnavn: Feltnavn, verdi: string) => void;
    settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => void;
}

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
    arbeidIUtlandet: IArbeidIUtlandet;
}

type ArbeidIUtlandetProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const ArbeidIUtlandet: React.StatelessComponent<ArbeidIUtlandetProps> = ({
    familieforhold,
    harForsoktNesteSteg,
    intl,
    nullstillNesteSteg,
    settStringFelt,
    settSvarFelt,
    arbeidIUtlandet,
}) => {
    const {
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        arbeiderAnnenForelderIUtlandet,
        arbeiderAnnenForelderIUtlandetForklaring,
    } = arbeidIUtlandet;
    const { borForeldreneSammenMedBarnet } = familieforhold;
    const feltMedFeil = hentFeltMedFeil(arbeidIUtlandet, harForsoktNesteSteg, intl);
    const annenForelderLabel = intl.formatMessage({
        id: 'arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.sporsmal',
    });

    return (
        <SideContainer
            ikon={<ArbeidIUtlandetIkon />}
            tittel={intl.formatMessage({ id: 'arbeidIUtlandet.tittel' })}
            intl={intl}
        >
            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal',
                    })}
                    name={'arbeiderIUtlandetEllerKontinentalsokkel'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvarFelt(
                            'arbeiderIUtlandetEllerKontinentalsokkel' as Feltnavn,
                            value as Svar
                        );
                        nullstillNesteSteg();
                    }}
                    checked={arbeiderIUtlandetEllerKontinentalsokkel.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.arbeiderIUtlandetEllerKontinentalsokkel}
                />
                {arbeiderIUtlandetEllerKontinentalsokkel.verdi === Svar.JA && (
                    <TilleggsinformasjonInput
                        label={intl.formatMessage({
                            id: 'arbeidIUtlandet.forklaring.hjelpetekst',
                        })}
                        defaultValue={arbeiderIUtlandetEllerKontinentalsokkelForklaring}
                        onBlur={(value: string) => {
                            settStringFelt(
                                'arbeiderIUtlandetEllerKontinentalsokkelForklaring' as Feltnavn,
                                value
                            );
                        }}
                        feil={feltMedFeil.arbeiderIUtlandetEllerKontinentalsokkelForklaring}
                    />
                )}

                {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <RadioPanelGruppe
                        legend={intl.formatMessage(
                            {
                                id: 'arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.sporsmal',
                            },
                            { navn: annenForelderLabel }
                        )}
                        name={'arbeiderAnnenForelderIUtlandet'}
                        className={'soknad__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            settSvarFelt(
                                'arbeiderAnnenForelderIUtlandet' as Feltnavn,
                                value as Svar
                            );
                            nullstillNesteSteg();
                        }}
                        checked={arbeiderAnnenForelderIUtlandet.verdi}
                        radios={[
                            { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                            { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        ]}
                        feil={feltMedFeil.arbeiderAnnenForelderIUtlandet}
                    />
                )}
                {arbeiderAnnenForelderIUtlandet.verdi === Svar.JA && (
                    <TilleggsinformasjonInput
                        label={intl.formatMessage({
                            id: 'arbeidIUtlandet.forklaring.hjelpetekst',
                        })}
                        defaultValue={arbeiderAnnenForelderIUtlandetForklaring}
                        onBlur={(value: string) => {
                            settStringFelt(
                                'arbeiderAnnenForelderIUtlandetForklaring' as Feltnavn,
                                value
                            );
                        }}
                        feil={feltMedFeil.arbeiderAnnenForelderIUtlandetForklaring}
                    />
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        arbeidIUtlandet: selectArbeidIUtlandet(state),
        familieforhold: selectFamilieforhold(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nullstillNesteSteg: () => {
            dispatch(soknadNullstillNesteSteg());
        },
        settStringFelt: (feltnavn: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('arbeidIUtlandet', feltnavn, verdi));
        },
        settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt('arbeidIUtlandet', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ArbeidIUtlandet));
