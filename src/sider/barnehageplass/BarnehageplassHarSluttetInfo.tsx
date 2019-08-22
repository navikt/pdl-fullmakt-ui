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

interface IBarnehageplassHarSluttetInfo {
    intl: InjectedIntl;
    brukFlertall: boolean;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
    lastOppVedlegg: (feltnavn: Feltnavn, filer: File[]) => void;
    slettVedlegg: (feltnavn: Feltnavn, filreferanse: string) => void;
}

interface IMapStateToProps {
    harForsoktNesteSteg: boolean;
    harSluttetIBarnehageAntallTimer: IFelt;
    harSluttetIBarnehageDato: IFelt;
    harSluttetIBarnehageKommune: IFelt;
    harSluttetIBarnehageVedlegg: IVedleggFelt;
}

type BarnehageplassHarSluttetInfoProps = IBarnehageplassHarSluttetInfo & IMapStateToProps;

const BarnehageplassHarSluttetInfo: React.StatelessComponent<BarnehageplassHarSluttetInfoProps> = ({
    brukFlertall,
    feltMedFeil,
    harForsoktNesteSteg,
    harSluttetIBarnehageAntallTimer,
    harSluttetIBarnehageDato,
    harSluttetIBarnehageKommune,
    harSluttetIBarnehageVedlegg,
    intl,
    lastOppVedlegg,
    settBarnehageplassVerdiFelt,
    slettVedlegg,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? { id: 'barnehageplass.harSluttetIBarnehage.dato.sporsmal.flertall' }
                            : { id: 'barnehageplass.harSluttetIBarnehage.dato.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageDato.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageDato}
                    maxLength={10}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? {
                                  id:
                                      'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal.flertall',
                              }
                            : { id: 'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageAntallTimer.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageAntallTimer}
                    type={'tel'}
                    autoComplete={'off'}
                    maxLength={5}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harSluttetIBarnehage.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageKommune.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageKommune}
                    maxLength={50}
                />

                <Vedlegg
                    sporsmal={intl.formatMessage({
                        id: 'barnehageplass.harSluttetIBarnehage.vedlegg.sporsmal',
                    })}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harSluttetIBarnehage.vedlegg.label',
                    })}
                    className={'barnehage__vedlegg'}
                    harForsoktNesteSteg={harForsoktNesteSteg}
                    feil={{
                        meldingsNokkel: harSluttetIBarnehageVedlegg.feilmeldingsNokkel,
                        status: harSluttetIBarnehageVedlegg.valideringsStatus,
                    }}
                    vedlegg={harSluttetIBarnehageVedlegg.verdi}
                    onChange={evt => {
                        if (evt.target.files) {
                            lastOppVedlegg(
                                'harSluttetIBarnehageVedlegg',
                                Array.from(evt.target.files)
                            );
                        }
                    }}
                    onDelete={(filreferanse: string) =>
                        slettVedlegg('harSluttetIBarnehageVedlegg', filreferanse)
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
        harSluttetIBarnehageAntallTimer: barnehageplass.harSluttetIBarnehageAntallTimer,
        harSluttetIBarnehageDato: barnehageplass.harSluttetIBarnehageDato,
        harSluttetIBarnehageKommune: barnehageplass.harSluttetIBarnehageKommune,
        harSluttetIBarnehageVedlegg: barnehageplass.harSluttetIBarnehageVedlegg,
    };
};

export default connect(mapStateToProps)(BarnehageplassHarSluttetInfo);
