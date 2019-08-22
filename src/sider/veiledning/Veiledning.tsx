import { BekreftCheckboksPanel, Select } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appVelgSprak } from '../../app/actions';
import { selectHarForsoktNesteSteg, selectValgtSprak } from '../../app/selectors';
import { ISprak } from '../../app/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState, Svar, ValideringsStatus } from '../../soknad/types';
import { Personopplysning } from './Personopplysning';

interface IMapStateToProps {
    fornavn: string;
    soknad: ISoknadState;
    harForsoktNesteSteg: boolean;
    valgtSprak: ISprak;
}

interface IMapDispatchToProps {
    oppdaterSprak: (sprak: ISprak) => void;
    settBekreftelse: (verdi: Svar) => void;
}

function sprakMap(sprak: string) {
    switch (sprak) {
        case 'nn':
            return ISprak.nn;
        default:
            return ISprak.nb;
    }
}

type VeiledningProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Veiledning: React.StatelessComponent<VeiledningProps> = ({
    intl,
    fornavn,
    oppdaterSprak,
    valgtSprak,
    settBekreftelse,
    soknad,
    harForsoktNesteSteg,
}) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.veiledning',
        });
    }

    return (
        <div className={'veiledning'}>
            <Select
                className={'veiledning__sprakvalg'}
                label=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    oppdaterSprak(sprakMap(e.target.value))
                }
                value={valgtSprak}
            >
                <option value="nb" key={ISprak.nb}>
                    Bokmål
                </option>
                <option value="nn" key={ISprak.nn}>
                    Nynorsk
                </option>
            </Select>
            <div className={'veiledning__veileder-container'}>
                <Veileder
                    posisjon={'topp'}
                    className={'veiledning__veileder'}
                    storrelse={'M'}
                    center={true}
                    tekst={
                        <div className={'veiledning__veileder-snakkeboble'}>
                            <Element>
                                <FormattedMessage id={'veiledningsside.veileder.hei'} />{' '}
                                <span className={'veiledning__veileder-navn'}>{fornavn}</span>!
                            </Element>
                            <Normaltekst>
                                <FormattedMessage id={'veiledningsside.veileder.melding'} />
                            </Normaltekst>
                        </div>
                    }
                >
                    <Veilederikon morkBakgrunn={true} />
                </Veileder>
            </div>

            <Sidetittel className={'veiledning__sidetittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Sidetittel>
            <Normaltekst className={'veiledning__info'}>
                <FormattedHTMLMessage id={'veiledningsside.vilkaar.info'} />
            </Normaltekst>

            <BekreftCheckboksPanel
                className={'veiledning__bekreftelse'}
                onChange={(evt: React.SyntheticEvent<EventTarget>) => {
                    const target = evt.nativeEvent.target as HTMLInputElement;
                    settBekreftelse(target.checked ? Svar.JA : Svar.NEI);
                }}
                checked={soknad.veiledning.bekreftelse.verdi === Svar.JA}
                label={intl.formatHTMLMessage({ id: 'veiledningsside.bekreftelse.label' })}
            >
                <FormattedHTMLMessage id={'veiledningsside.bekreftelse.innhold'} />
            </BekreftCheckboksPanel>
            {harForsoktNesteSteg &&
                soknad.veiledning.bekreftelse.valideringsStatus !== ValideringsStatus.OK && (
                    <FormattedMessage id={soknad.veiledning.bekreftelse.feilmeldingsNokkel}>
                        {txt => (
                            <div role="alert" className={'skjemaelement__feilmelding'}>
                                {txt}
                            </div>
                        )}
                    </FormattedMessage>
                )}
            <Personopplysning className={'veiledning__personopplysning'} />
            <Submitknapp className={'veiledning__knapp'} />
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        fornavn: selectSoker(state).fornavn.toLocaleLowerCase(),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soknad: selectSoknad(state),
        valgtSprak: selectValgtSprak(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        oppdaterSprak: (sprak: ISprak) => {
            dispatch(appVelgSprak(sprak));
        },
        settBekreftelse: (verdi: Svar) =>
            dispatch(soknadValiderFelt('veiledning', 'bekreftelse', verdi)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Veiledning));
