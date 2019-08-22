import * as classNames from 'classnames';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IFeltFeil } from '../../common/types';
import AdvarselIkon from '../../component/Ikoner/AdvarselIkon';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt, ValideringsStatus } from '../../soknad/types';

interface IHarBarnehageplassInfo {
    intl: InjectedIntl;
    brukFlertall: boolean;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    harBarnehageplassAntallTimer: IFelt;
    harBarnehageplassDato: IFelt;
    harBarnehageplassKommune: IFelt;
}

type HarBarnehageplassType = IHarBarnehageplassInfo & IMapStateToProps;

const HarBarnehageplassInfo: React.StatelessComponent<HarBarnehageplassType> = ({
    feltMedFeil,
    harBarnehageplassAntallTimer,
    harBarnehageplassDato,
    harBarnehageplassKommune,
    intl,
    brukFlertall,
    settBarnehageplassVerdiFelt,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={classNames('inputElement', 'barnehageplass__dato-input')}
                    label={intl.formatMessage(
                        brukFlertall
                            ? { id: 'barnehageplass.harBarnehageplass.dato.sporsmal.flertall' }
                            : { id: 'barnehageplass.harBarnehageplass.dato.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harBarnehageplassDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harBarnehageplassDato.verdi}
                    feil={feltMedFeil.harBarnehageplassDato}
                    maxLength={10}
                />
                <div className={'inputElement barnehageplass__antallTimer--container'}>
                    <Input
                        className={classNames('barnehageplass__antallTimer-input')}
                        label={intl.formatMessage(
                            brukFlertall
                                ? {
                                      id:
                                          'barnehageplass.harBarnehageplass.antallTimer.sporsmal.flertall',
                                  }
                                : { id: 'barnehageplass.harBarnehageplass.antallTimer.sporsmal' }
                        )}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settBarnehageplassVerdiFelt(
                                'harBarnehageplassAntallTimer' as Feltnavn,
                                event.target.value as BarnehageplassVerdier
                            )
                        }
                        defaultValue={harBarnehageplassAntallTimer.verdi}
                        feil={feltMedFeil.harBarnehageplassAntallTimer}
                        type={'tel'}
                        autoComplete={'off'}
                        maxLength={5}
                    />
                    {harBarnehageplassAntallTimer.valideringsStatus ===
                        ValideringsStatus.ADVARSEL && (
                        <AdvarselIkon
                            className={'barnehageplass__antallTimer--advarsel'}
                            style={{}}
                        />
                    )}
                </div>
                <Input
                    className={classNames('inputElement', 'barnehageplass__kommune-input')}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harBarnehageplass.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harBarnehageplassKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harBarnehageplassKommune.verdi}
                    feil={feltMedFeil.harBarnehageplassKommune}
                    maxLength={50}
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harBarnehageplassAntallTimer: selectBarnehageplass(state).harBarnehageplassAntallTimer,
        harBarnehageplassDato: selectBarnehageplass(state).harBarnehageplassDato,
        harBarnehageplassKommune: selectBarnehageplass(state).harBarnehageplassKommune,
    };
};

export default connect(mapStateToProps)(HarBarnehageplassInfo);
