import * as classNames from 'classnames';
import PanelBase from 'nav-frontend-paneler';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import Barnehageikon from '../../component/Ikoner/BarnehageIkon';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import SideContainer from '../../component/StegSide/StegSide';
import { IRootState } from '../../rootReducer';
import {
    soknadFjernVedlegg,
    soknadNullstillNesteSteg,
    soknadValiderFelt,
} from '../../soknad/actions';
import { selectBarnehageplass, selectMineBarn } from '../../soknad/selectors';
import {
    BarnehageplassVerdier,
    Feltnavn,
    IBarnehageplass,
    IMineBarn,
    Svar,
    ValideringsStatus,
} from '../../soknad/types';
import { vedleggLastOpp } from '../../vedlegg/actions';
import BarnehageplassHarSluttetInfo from './BarnehageplassHarSluttetInfo';
import BarnehageplassSkalBegynneInfo from './BarnehageplassSkalBegynneInfo';
import BarnehageplassSkalSlutteInfo from './BarnehageplassSkalSlutteInfo';
import BarnehageplassStatus from './BarnehageplassStatus';
import HarBarnehageplassInfo from './HarBarnehageplassInfo';

interface IMapStateToProps {
    barnehageplass: IBarnehageplass;
    harForsoktNesteSteg: boolean;
    mineBarn: IMineBarn;
}

interface IMapDispatchToProps {
    nullstillNesteSteg: () => void;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
    settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => void;
    lastOppVedlegg: (feltnavn: Feltnavn, filer: File[]) => void;
    slettVedlegg: (feltnavn: Feltnavn, filreferanse: string) => void;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    barnehageplass,
    harForsoktNesteSteg,
    intl,
    mineBarn,
    nullstillNesteSteg,
    settBarnehageplassVerdiFelt,
    settSvarFelt,
    lastOppVedlegg,
    slettVedlegg,
}) => {
    const {
        barnBarnehageplassStatus,
        harBarnehageplass,
        harBarnehageplassAntallTimer,
    } = barnehageplass;
    const feltMedFeil = hentFeltMedFeil(barnehageplass, harForsoktNesteSteg, intl);
    const brukFlertall = mineBarn.erFlerling.verdi === Svar.JA;

    return (
        <SideContainer
            className={'barnehage'}
            ikon={<Barnehageikon />}
            tittel={intl.formatMessage({ id: 'barnehageplass.tittel' })}
            hjelpetekstNokkel={'barnehageplass.hjelpetekst'}
            intl={intl}
        >
            <p className={classNames('typo-ingress', 'barnehage__ingress')}>
                {intl.formatMessage({ id: 'barnehageplass.ingress' })}
            </p>

            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage(
                        brukFlertall
                            ? { id: 'barnehageplass.harPlass.flertall' }
                            : { id: 'barnehageplass.harPlass' }
                    )}
                    name={'harBarnehageplass'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvarFelt('harBarnehageplass' as Feltnavn, value as Svar);
                        settBarnehageplassVerdiFelt(
                            'barnBarnehageplassStatus' as Feltnavn,
                            BarnehageplassVerdier.Ubesvart
                        );
                        nullstillNesteSteg();
                    }}
                    checked={harBarnehageplass.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.harBarnehageplass}
                />
                {harBarnehageplass.verdi !== Svar.UBESVART && (
                    <>
                        <PanelBase className={'barnehage__panel'}>
                            <BarnehageplassStatus
                                barnBarnehageplassStatus={barnBarnehageplassStatus}
                                feltMedFeil={feltMedFeil}
                                harBarnehageplass={harBarnehageplass}
                                intl={intl}
                                brukFlertall={brukFlertall}
                                settBarnehageplassVerdiFelt={(
                                    feltnavn: Feltnavn,
                                    value: BarnehageplassVerdier
                                ) => {
                                    settBarnehageplassVerdiFelt(feltnavn, value);
                                    nullstillNesteSteg();
                                }}
                            />
                            {barnBarnehageplassStatus.verdi ===
                                BarnehageplassVerdier.harSluttetIBarnehage && (
                                <BarnehageplassHarSluttetInfo
                                    intl={intl}
                                    brukFlertall={brukFlertall}
                                    feltMedFeil={feltMedFeil}
                                    settBarnehageplassVerdiFelt={settBarnehageplassVerdiFelt}
                                    lastOppVedlegg={lastOppVedlegg}
                                    slettVedlegg={slettVedlegg}
                                />
                            )}
                            {barnBarnehageplassStatus.verdi ===
                                BarnehageplassVerdier.skalSlutteIBarnehage && (
                                <BarnehageplassSkalSlutteInfo
                                    intl={intl}
                                    brukFlertall={brukFlertall}
                                    feltMedFeil={feltMedFeil}
                                    settBarnehageplassVerdiFelt={settBarnehageplassVerdiFelt}
                                    lastOppVedlegg={lastOppVedlegg}
                                    slettVedlegg={slettVedlegg}
                                />
                            )}
                            {barnBarnehageplassStatus.verdi ===
                                BarnehageplassVerdier.skalBegynneIBarnehage && (
                                <BarnehageplassSkalBegynneInfo
                                    intl={intl}
                                    brukFlertall={brukFlertall}
                                    feltMedFeil={feltMedFeil}
                                    settBarnehageplassVerdiFelt={settBarnehageplassVerdiFelt}
                                />
                            )}
                            {barnBarnehageplassStatus.verdi ===
                                BarnehageplassVerdier.harBarnehageplass && (
                                <HarBarnehageplassInfo
                                    feltMedFeil={feltMedFeil}
                                    intl={intl}
                                    brukFlertall={brukFlertall}
                                    settBarnehageplassVerdiFelt={settBarnehageplassVerdiFelt}
                                />
                            )}
                        </PanelBase>
                        {barnBarnehageplassStatus.verdi ===
                            BarnehageplassVerdier.harBarnehageplass &&
                            harBarnehageplassAntallTimer.valideringsStatus ===
                                ValideringsStatus.ADVARSEL && (
                                <Veileder
                                    posisjon={'høyre'}
                                    className={'barnehage__advarsel'}
                                    tekst={
                                        <FormattedMessage
                                            id={harBarnehageplassAntallTimer.feilmeldingsNokkel}
                                        />
                                    }
                                    type={'advarsel'}
                                >
                                    <Veilederikon morkBakgrunn={true} />
                                </Veileder>
                            )}
                    </>
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barnehageplass: selectBarnehageplass(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        mineBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    const STEGNAVN = 'barnehageplass';
    return {
        lastOppVedlegg: (feltnavn: Feltnavn, filer: File[]) => {
            dispatch(vedleggLastOpp(STEGNAVN, feltnavn, filer));
        },
        nullstillNesteSteg: () => {
            dispatch(soknadNullstillNesteSteg());
        },
        settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => {
            dispatch(soknadValiderFelt(STEGNAVN, feltnavn, verdi));
        },
        settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt(STEGNAVN, feltnavn, verdi));
        },
        slettVedlegg: (feltnavn: Feltnavn, filref: string) => {
            dispatch(soknadFjernVedlegg(STEGNAVN, feltnavn, filref));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Barnehageplass));
