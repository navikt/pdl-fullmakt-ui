import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import OppsummeringSteg from './OppsummeringSteg';

interface IMapStateToProps {
    soker: {
        fodselsnummer: string;
        navn: string;
        statsborgerskap: string;
    };
}

type PersonaliaOgBarnProps = IMapStateToProps;

const PersonaliaOppsummering: React.StatelessComponent<PersonaliaOgBarnProps> = ({ soker }) => {
    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id="oppsummering.sokerKontantstotteAv.label" />
            </Element>
            <Normaltekst>{soker.navn}</Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsnummer.label" />
                {soker.fodselsnummer}
            </Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oppsummering.statsborgerskap.label" />
                <FormattedMessage id={soker.statsborgerskap} />
            </Normaltekst>
        </OppsummeringSteg>
    );
};

export default PersonaliaOppsummering;
