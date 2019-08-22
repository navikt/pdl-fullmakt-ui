import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import UtenlandskeYtelserIkon from '../../component/Ikoner/UtenlandskeYtelserIkon';
import SideContainer from '../../component/StegSide/StegSide';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { IRootState } from '../../rootReducer';
import { soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold, selectYtelserFraUtland } from '../../soknad/selectors';
import { Feltnavn, IFamilieforhold, IUtenlandskeYtelser, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nullstillNesteSteg: () => void;
    settStringFelt: (feltnavn: Feltnavn, verdi: string) => void;
    settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => void;
}

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
    utenlandskeYtelser: IUtenlandskeYtelser;
}

type UtenlandskeYtelserProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const UtenlandskeYtelser: React.StatelessComponent<UtenlandskeYtelserProps> = ({
    familieforhold,
    harForsoktNesteSteg,
    intl,
    nullstillNesteSteg,
    settStringFelt,
    settSvarFelt,
    utenlandskeYtelser,
}) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskeYtelser;
    const { borForeldreneSammenMedBarnet } = familieforhold;
    const feltMedFeil = hentFeltMedFeil(utenlandskeYtelser, harForsoktNesteSteg, intl);
    const annenForelderLabel = intl.formatMessage({
        id: 'utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland.annenForelder',
    });

    return (
        <SideContainer
            ikon={<UtenlandskeYtelserIkon />}
            tittel={intl.formatMessage({ id: 'utenlandskeYtelser.tittel' })}
            hjelpetekstNokkel={'utenlandskeYtelser.hjelpetekst'}
            intl={intl}
        >
            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'utenlandskeYtelser.mottarYtelserFraUtland.sporsmal',
                    })}
                    name={'mottarYtelserFraUtland'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvarFelt('mottarYtelserFraUtland' as Feltnavn, value as Svar);
                        nullstillNesteSteg();
                    }}
                    checked={mottarYtelserFraUtland.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.mottarYtelserFraUtland}
                />
                {mottarYtelserFraUtland.verdi === Svar.JA && (
                    <TilleggsinformasjonInput
                        label={intl.formatMessage({
                            id: 'utenlandskeYtelser.forklaring.hjelpetekst',
                        })}
                        defaultValue={mottarYtelserFraUtlandForklaring}
                        onBlur={(value: string) => {
                            settStringFelt('mottarYtelserFraUtlandForklaring' as Feltnavn, value);
                        }}
                        feil={feltMedFeil.mottarYtelserFraUtlandForklaring}
                    />
                )}

                {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <RadioPanelGruppe
                        legend={intl.formatMessage(
                            {
                                id:
                                    'utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland.sporsmal',
                            },
                            { navn: annenForelderLabel }
                        )}
                        name={'mottarAnnenForelderYtelserFraUtland'}
                        className={'soknad__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            settSvarFelt(
                                'mottarAnnenForelderYtelserFraUtland' as Feltnavn,
                                value as Svar
                            );
                            nullstillNesteSteg();
                        }}
                        checked={mottarAnnenForelderYtelserFraUtland.verdi}
                        radios={[
                            { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                            { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        ]}
                        feil={feltMedFeil.mottarAnnenForelderYtelserFraUtland}
                    />
                )}
                {mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA && (
                    <TilleggsinformasjonInput
                        label={intl.formatMessage({
                            id: 'utenlandskeYtelser.forklaring.hjelpetekst',
                        })}
                        defaultValue={mottarAnnenForelderYtelserFraUtlandForklaring}
                        onBlur={(value: string) => {
                            settStringFelt(
                                'mottarAnnenForelderYtelserFraUtlandForklaring' as Feltnavn,
                                value
                            );
                        }}
                        feil={feltMedFeil.mottarAnnenForelderYtelserFraUtlandForklaring}
                    />
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        familieforhold: selectFamilieforhold(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        utenlandskeYtelser: selectYtelserFraUtland(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nullstillNesteSteg: () => {
            dispatch(soknadNullstillNesteSteg());
        },
        settStringFelt: (feltnavn: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('utenlandskeYtelser', feltnavn, verdi));
        },
        settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt('utenlandskeYtelser', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UtenlandskeYtelser));
