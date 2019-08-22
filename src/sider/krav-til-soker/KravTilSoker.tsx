import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeil } from '../../common/types';
import { hentFeltMedFeil } from '../../common/utils';
import SideContainer from '../../component/StegSide/StegSide';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectKravTilSoker } from '../../soknad/selectors';
import { Feltnavn, IKravTilSoker, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: Feltnavn, verdi: string) => void;
}

interface IMapStateToProps {
    harForsoktNesteSteg: boolean;
    kravTilSoker: IKravTilSoker;
}

type KravTilSokerProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const KravTilSoker: React.StatelessComponent<KravTilSokerProps> = ({
    harForsoktNesteSteg,
    kravTilSoker,
    intl,
    settCheckboxVerdi,
}) => {
    const feil = Object.values(hentFeltMedFeil(kravTilSoker, harForsoktNesteSteg, intl)).reduce(
        (acc: IFeil | undefined, felt: IFeil | undefined) => {
            return felt !== undefined ? felt : acc;
        },
        undefined
    );

    return (
        <SideContainer className={'krav'} intl={intl}>
            <Veileder
                content={
                    <div>
                        <FormattedHTMLMessage id={'startside.krav.veileder'} />
                    </div>
                }
                className={'krav__veileder'}
            />
            <form>
                <CheckboksPanelGruppe
                    legend={''}
                    checkboxes={[
                        {
                            checked: kravTilSoker.borSammenMedBarnet.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.borSammenMedBarnet',
                            }),
                            value: 'borSammenMedBarnet',
                        },
                        {
                            checked: kravTilSoker.barnIkkeHjemme.verdi === Svar.JA,
                            label: intl.formatMessage({ id: 'startside.krav.barnIkkeHjemme' }),
                            value: 'barnIkkeHjemme',
                        },
                        {
                            checked: kravTilSoker.ikkeAvtaltDeltBosted.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.ikkeAvtaltDeltBosted',
                            }),
                            value: 'ikkeAvtaltDeltBosted',
                        },
                        {
                            checked:
                                kravTilSoker.skalBoMedBarnetINorgeNesteTolvMaaneder.verdi ===
                                Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder',
                            }),
                            value: 'skalBoMedBarnetINorgeNesteTolvMaaneder',
                        },
                    ]}
                    onChange={(event: React.SyntheticEvent<EventTarget>, value?: string) => {
                        if (value) {
                            const target = event.nativeEvent.target as HTMLInputElement;
                            settCheckboxVerdi(
                                value as Feltnavn,
                                target.checked ? Svar.JA : Svar.UBESVART
                            );
                        }
                    }}
                    feil={feil}
                />
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        kravTilSoker: selectKravTilSoker(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settCheckboxVerdi: (feltnavn: Feltnavn, verdi) =>
            dispatch(soknadValiderFelt('kravTilSoker', feltnavn, verdi)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(KravTilSoker)
);
