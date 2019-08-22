import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeltFeil } from '../../common/types';
import { Vedlegg } from '../../component/Vedlegg';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt, IVedleggFelt } from '../../soknad/types';

interface IBarnehageplassSkalSlutteInfo {
    intl: InjectedIntl;
    brukFlertall: boolean;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
    lastOppVedlegg: (feltnavn: Feltnavn, filer: File[]) => void;
    slettVedlegg: (feltnavn: Feltnavn, filreferanse: string) => void;
}

interface IMapStateToProps {
    harForsoktNesteSteg: boolean;
    skalSlutteIBarnehageAntallTimer: IFelt;
    skalSlutteIBarnehageDato: IFelt;
    skalSlutteIBarnehageKommune: IFelt;
    skalSlutteIBarnehageVedlegg: IVedleggFelt;
}

type BarnehageplassSkalSlutteInfoProps = IBarnehageplassSkalSlutteInfo & IMapStateToProps;

const BarnehageplassSkalSlutteInfo: React.StatelessComponent<BarnehageplassSkalSlutteInfoProps> = ({
    intl,
    brukFlertall,
    feltMedFeil,
    settBarnehageplassVerdiFelt,
    skalSlutteIBarnehageAntallTimer,
    skalSlutteIBarnehageDato,
    skalSlutteIBarnehageKommune,
    skalSlutteIBarnehageVedlegg,
    harForsoktNesteSteg,
    lastOppVedlegg,
    slettVedlegg,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? { id: 'barnehageplass.skalSlutteIBarnehage.dato.sporsmal.flertall' }
                            : { id: 'barnehageplass.skalSlutteIBarnehage.dato.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageDato.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageDato}
                    maxLength={10}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? {
                                  id:
                                      'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal.flertall',
                              }
                            : { id: 'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageAntallTimer.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageAntallTimer}
                    type={'tel'}
                    autoComplete={'off'}
                    maxLength={5}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageKommune.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageKommune}
                    maxLength={50}
                />
                <Vedlegg
                    sporsmal={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.vedlegg.sporsmal',
                    })}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.vedlegg.label',
                    })}
                    className={'barnehage__vedlegg'}
                    harForsoktNesteSteg={harForsoktNesteSteg}
                    feil={{
                        meldingsNokkel: skalSlutteIBarnehageVedlegg.feilmeldingsNokkel,
                        status: skalSlutteIBarnehageVedlegg.valideringsStatus,
                    }}
                    vedlegg={skalSlutteIBarnehageVedlegg.verdi}
                    onChange={evt => {
                        if (evt.target.files) {
                            lastOppVedlegg(
                                'skalSlutteIBarnehageVedlegg',
                                Array.from(evt.target.files)
                            );
                        }
                    }}
                    onDelete={(filreferanse: string) =>
                        slettVedlegg('skalSlutteIBarnehageVedlegg', filreferanse)
                    }
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    const barnehageplass = selectBarnehageplass(state);
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        skalSlutteIBarnehageAntallTimer: barnehageplass.skalSlutteIBarnehageAntallTimer,
        skalSlutteIBarnehageDato: barnehageplass.skalSlutteIBarnehageDato,
        skalSlutteIBarnehageKommune: barnehageplass.skalSlutteIBarnehageKommune,
        skalSlutteIBarnehageVedlegg: barnehageplass.skalSlutteIBarnehageVedlegg,
    };
};

export default connect(mapStateToProps)(BarnehageplassSkalSlutteInfo);
