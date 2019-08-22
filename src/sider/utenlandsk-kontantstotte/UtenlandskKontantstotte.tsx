import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import FlaskeIkon from '../../component/Ikoner/FlaskeIkon';
import SideContainer from '../../component/StegSide/StegSide';
import TilleggsinformasjonInput from '../../component/TilleggsinformasjonInput/TilleggsinformasjonInput';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectUtenlandskKontantstotte } from '../../soknad/selectors';
import { Feltnavn, IUtenlandskKontantstotte, Svar } from '../../soknad/types';

interface IMapStateToProps {
    utenlandskKontantstotte: IUtenlandskKontantstotte;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settSvar: (feltnavn: Feltnavn, verdi: Svar) => void;
    settTekstSvar: (feltnavn: Feltnavn, verdi: string) => void;
}

type UtenlandskKontantstotteSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const UtenlandskKontantstotte: React.StatelessComponent<UtenlandskKontantstotteSideProps> = ({
    utenlandskKontantstotte,
    harForsoktNesteSteg,
    settSvar,
    settTekstSvar,
    intl,
}) => {
    const {
        mottarKontantstotteFraUtlandet,
        mottarKontantstotteFraUtlandetTilleggsinfo,
    } = utenlandskKontantstotte;

    const feltMedFeil = hentFeltMedFeil(utenlandskKontantstotte, harForsoktNesteSteg, intl);

    return (
        <SideContainer
            ikon={<FlaskeIkon />}
            tittel={intl.formatMessage({ id: 'utenlandskKontantstotte.tittel' })}
            hjelpetekstNokkel={'utenlandskKontantstotte.hjelpetekst'}
            intl={intl}
        >
            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.sporsmal',
                    })}
                    name={'mottarKontantstotteFraUtlandet'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvar('mottarKontantstotteFraUtlandet', value as Svar);
                    }}
                    checked={mottarKontantstotteFraUtlandet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.mottarKontantstotteFraUtlandet}
                />
                {mottarKontantstotteFraUtlandet.verdi === Svar.JA && (
                    <TilleggsinformasjonInput
                        label={intl.formatMessage({
                            id:
                                'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.tilleggsinfo.sporsmal',
                        })}
                        defaultValue={mottarKontantstotteFraUtlandetTilleggsinfo}
                        onBlur={(value: string) => {
                            settTekstSvar(
                                'mottarKontantstotteFraUtlandetTilleggsinfo',
                                value as string
                            );
                        }}
                        feil={feltMedFeil.mottarKontantstotteFraUtlandetTilleggsinfo}
                    />
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        utenlandskKontantstotte: selectUtenlandskKontantstotte(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settSvar: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt('utenlandskKontantstotte', feltnavn, verdi));
        },
        settTekstSvar: (feltnavn: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('utenlandskKontantstotte', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UtenlandskKontantstotte));
