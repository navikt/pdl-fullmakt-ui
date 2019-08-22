import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { stegConfig } from '../../stegConfig';
import OppsummeringSteg from './OppsummeringSteg';

const KravTilSokerOppsummering: React.StatelessComponent<{}> = () => {
    return (
        <OppsummeringSteg stegIndeks={stegConfig.kravTilSoker.stegIndeks}>
            <Element>
                <FormattedMessage id={'oppsummering.kravtilsoker.tittel'} />
            </Element>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'startside.krav.borSammenMedBarnet'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'startside.krav.barnIkkeHjemme'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'startside.krav.ikkeAvtaltDeltBosted'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder'} />
            </Normaltekst>
        </OppsummeringSteg>
    );
};

export default KravTilSokerOppsummering;
