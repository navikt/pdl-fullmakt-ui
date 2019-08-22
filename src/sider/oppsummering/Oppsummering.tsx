import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import SideContainer from '../../component/StegSide/StegSide';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { ISoker } from '../../soker/types';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState, Svar, ValideringsStatus } from '../../soknad/types';
import ArbeidIUtlandetOppsummering from './ArbeidIUtlandetOppsummering';
import BarnehageplassOppsummering from './BarnehageplassOppsummering';
import { BarnOppsummering } from './BarnOppsummering';
import FamilieforholdOppsummering from './FamilieforholdOppsummering';
import KravTilSokerOppsummering from './KravTilSokerOppsummering';
import PersonaliaOppsummering from './PersonaliaOppsummering';
import TilknytningTilUtlandOppsummering from './TilknytningTilUtlandOppsummering';
import UtenlandskeYtelserOppsummering from './UtenlandskeYtelserOppsummering';
import UtenlandskKontantstotteOppsummering from './UtenlandskKontantstotteOppsummering';
import { VeiledningOppsummering } from './VeiledningOppsummering';

interface IMapStateToProps {
    soker: ISoker;
    soknad: ISoknadState;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settBekreftelse: (verdi: Svar) => void;
}

type OppsummeringSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Oppsummering: React.StatelessComponent<OppsummeringSideProps> = ({
    harForsoktNesteSteg,
    intl,
    settBekreftelse,
    soker,
    soknad,
}) => {
    const brukFlertall = soknad.mineBarn.erFlerling.verdi === 'JA';
    return (
        <SideContainer
            className={'oppsummering'}
            tittel={<FormattedMessage id={'oppsummering.tittel'} />}
            intl={intl}
        >
            <Veileder
                content={
                    <div>
                        <FormattedMessage id={'oppsummering.veileder.info'} />
                    </div>
                }
                className={'oppsummering__veileder'}
            />
            <SoknadPanel className={'oppsummering__panel'}>
                <PersonaliaOppsummering
                    soker={{
                        fodselsnummer: soker.innloggetSom,
                        navn: soker.fulltnavn,
                        statsborgerskap: soker.statsborgerskap,
                    }}
                />
                <VeiledningOppsummering />
                <KravTilSokerOppsummering />
                <BarnOppsummering barn={soknad.mineBarn} />
                <BarnehageplassOppsummering
                    barnehageplass={soknad.barnehageplass}
                    brukFlertall={brukFlertall}
                />
                <FamilieforholdOppsummering familieforhold={soknad.familieforhold} />
                <TilknytningTilUtlandOppsummering
                    familieforhold={soknad.familieforhold}
                    tilknytningTilUtland={soknad.tilknytningTilUtland}
                />
                <ArbeidIUtlandetOppsummering
                    familieforhold={soknad.familieforhold}
                    arbeidIUtlandet={soknad.arbeidIUtlandet}
                />
                <UtenlandskeYtelserOppsummering
                    familieforhold={soknad.familieforhold}
                    utenlandskeYtelser={soknad.utenlandskeYtelser}
                />
                <UtenlandskKontantstotteOppsummering
                    utenlandskKontantstotte={soknad.utenlandskKontantstotte}
                />
            </SoknadPanel>
            <BekreftCheckboksPanel
                className={'oppsummering__bekreftelse'}
                onChange={(evt: React.SyntheticEvent<EventTarget>) => {
                    const target = evt.nativeEvent.target as HTMLInputElement;
                    settBekreftelse(target.checked ? Svar.JA : Svar.NEI);
                }}
                checked={soknad.oppsummering.bekreftelse.verdi === Svar.JA}
                label={intl.formatMessage({ id: 'oppsummering.bekreftelse.label' })}
            />
            {harForsoktNesteSteg &&
                soknad.oppsummering.bekreftelse.valideringsStatus !== ValideringsStatus.OK && (
                    <FormattedMessage id={soknad.oppsummering.bekreftelse.feilmeldingsNokkel}>
                        {txt => (
                            <div role="alert" className={'skjemaelement__feilmelding'}>
                                {txt}
                            </div>
                        )}
                    </FormattedMessage>
                )}
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soker: selectSoker(state),
        soknad: selectSoknad(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBekreftelse: (verdi: Svar) =>
            dispatch(soknadValiderFelt('oppsummering', 'bekreftelse', verdi)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Oppsummering));
