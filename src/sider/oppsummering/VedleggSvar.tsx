import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import BindersIkon from '../../component/Ikoner/BindersIkon';
import { IVedlegg } from '../../vedlegg/types';

interface IVedleggSvar {
    sporsmal: React.ReactNode;
    vedlegg: IVedlegg[];
}

const VedleggSvar: React.FunctionComponent<IVedleggSvar> = ({ sporsmal, vedlegg }) => {
    return (
        <div>
            <Element className={'oppsummering__sporsmal'}>{sporsmal}</Element>
            <ul className={'oppsummering__vedlegg-liste'}>
                {vedlegg.map(v => {
                    return (
                        <li key={v.filreferanse} className={'oppsummering__vedlegg-element'}>
                            <BindersIkon className={'oppsummering__binders-ikon'} />
                            <Normaltekst className={'oppsummering__svar'}>{v.filnavn}</Normaltekst>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export { VedleggSvar };
