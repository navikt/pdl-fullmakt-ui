import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, Svar } from '../../soknad/types';
import { stegConfig } from '../../stegConfig';
import { JaNeiSvar } from './JaNeiSvar';
import OppsummeringSteg from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IFamilieforholdOppsummering {
    familieforhold: IFamilieforhold;
}

type FamilieforholdOppsummeringProps = IFamilieforholdOppsummering;

const FamilieforholdOppsummering: React.StatelessComponent<FamilieforholdOppsummeringProps> = ({
    familieforhold,
}) => {
    return (
        <OppsummeringSteg stegIndeks={stegConfig.familieforhold.stegIndeks}>
            <Element>
                <FormattedMessage id={'familieforhold.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage id={'familieforhold.borForeldreneSammenMedBarnet.sporsmal'} />
                }
                svar={<JaNeiSvar verdi={familieforhold.borForeldreneSammenMedBarnet.verdi} />}
            />
            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'oppsummering.familieforhold.annenForelderNavn.label'}
                            />
                        }
                        svar={familieforhold.annenForelderNavn.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'oppsummering.familieforhold.annenForelderFodselsnummer.label'}
                            />
                        }
                        svar={familieforhold.annenForelderFodselsnummer.verdi}
                    />
                </>
            )}
        </OppsummeringSteg>
    );
};

export default FamilieforholdOppsummering;
