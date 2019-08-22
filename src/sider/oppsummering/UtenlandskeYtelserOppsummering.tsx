import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, IUtenlandskeYtelser, Svar } from '../../soknad/types';
import { stegConfig } from '../../stegConfig';
import { JaNeiSvar } from './JaNeiSvar';
import OppsummeringSteg from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IUtenlandskeYtelserOppsummeringProps {
    familieforhold: IFamilieforhold;
    utenlandskeYtelser: IUtenlandskeYtelser;
}

const utenlandskeYtelserOppsummering: React.StatelessComponent<
    IUtenlandskeYtelserOppsummeringProps
> = ({ familieforhold, utenlandskeYtelser }) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskeYtelser;

    const { borForeldreneSammenMedBarnet } = familieforhold;

    return (
        <OppsummeringSteg stegIndeks={stegConfig.utenlandskeYtelser.stegIndeks}>
            <Element>
                <FormattedMessage id={'utenlandskeYtelser.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage id={'utenlandskeYtelser.mottarYtelserFraUtland.sporsmal'} />
                }
                svar={<JaNeiSvar verdi={mottarYtelserFraUtland.verdi} />}
            />
            {mottarYtelserFraUtland.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={<FormattedMessage id={'utenlandskeYtelser.forklaring.hjelpetekst'} />}
                    svar={mottarYtelserFraUtlandForklaring.verdi}
                />
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={'utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland.sporsmal'}
                        />
                    }
                    svar={<JaNeiSvar verdi={mottarAnnenForelderYtelserFraUtland.verdi} />}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA && (
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage id={'utenlandskeYtelser.forklaring.hjelpetekst'} />
                        }
                        svar={mottarAnnenForelderYtelserFraUtlandForklaring.verdi}
                    />
                )}
        </OppsummeringSteg>
    );
};

export default utenlandskeYtelserOppsummering;
