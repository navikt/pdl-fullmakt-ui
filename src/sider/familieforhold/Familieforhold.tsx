import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import BorSammenIkon from '../../component/Ikoner/BorSammenIkon';
import SideContainer from '../../component/StegSide/StegSide';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settBorForeldreneSammenMedBarnetOgNullstillNeste: (verdi: Svar) => void;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    familieforhold,
    harForsoktNesteSteg,
    nesteSteg,
    settBorForeldreneSammenMedBarnetOgNullstillNeste,
    intl,
    ...annenForelderProps
}) => {
    const feltMedFeil = hentFeltMedFeil(familieforhold, harForsoktNesteSteg, intl);

    return (
        <SideContainer
            className={'familieforhold'}
            ikon={<BorSammenIkon />}
            tittel={intl.formatMessage({ id: 'familieforhold.tittel' })}
            hjelpetekstNokkel={'familieforhold.hjelpetekst'}
            intl={intl}
        >
            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'familieforhold.borForeldreneSammenMedBarnet.sporsmal',
                    })}
                    name={'borForeldreneSammenMedBarnet'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settBorForeldreneSammenMedBarnetOgNullstillNeste(value as Svar);
                    }}
                    checked={familieforhold.borForeldreneSammenMedBarnet.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.borForeldreneSammenMedBarnet}
                />

                {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <AnnenForelderInfo
                        familieforhold={familieforhold}
                        harForsoktNesteSteg={harForsoktNesteSteg}
                        {...annenForelderProps}
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
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settAnnenForelderFodselsnummer: personnr => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: navn => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderNavn', navn));
        },
        settBorForeldreneSammenMedBarnetOgNullstillNeste: (verdi: Svar) => {
            dispatch(soknadValiderFelt('familieforhold', 'borForeldreneSammenMedBarnet', verdi));
            dispatch(soknadNullstillNesteSteg());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Familieforhold));
