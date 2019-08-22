import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';

interface ISporsmalSvarProps {
    sporsmal: React.ReactNode;
    svar: React.ReactNode;
}

const SporsmalSvar: React.StatelessComponent<ISporsmalSvarProps> = ({ sporsmal, svar }) => {
    return (
        <div>
            <Element className={'oppsummering__sporsmal'}>{sporsmal}</Element>
            <Normaltekst className={'oppsummering__svar'}>{svar}</Normaltekst>
        </div>
    );
};

export { SporsmalSvar };
