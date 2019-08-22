import * as Bowser from 'bowser';
import { Flatknapp } from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IVedlegg } from '../../vedlegg/types';
import BindersIkon from '../Ikoner/BindersIkon';

interface IVedleggListe {
    vedlegg: IVedlegg[];
    onDelete: (filreferanse: string) => void;
}

const VedleggListe: React.FunctionComponent<IVedleggListe> = ({ vedlegg, onDelete }) => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const erSafari = browser.is('safari');

    const totalStorrelse = vedlegg.reduce((acc, cur) => {
        return cur.isLoading ? acc : acc + cur.fil.size;
    }, 0);

    const antallMB = (totalStorrelse / 1000000).toFixed(2);

    return (
        <>
            <Element className={'vedlegg-liste__label'}>
                <FormattedMessage
                    id={'app.vedlegg.valgt'}
                    values={{
                        storrelse: antallMB,
                    }}
                />
            </Element>
            <ul className={'vedlegg-liste__liste'}>
                {vedlegg.map(v => {
                    const isLoading = v.isLoading;
                    return (
                        <li key={v.filreferanse} className={'vedlegg-liste__element'}>
                            {isLoading ? (
                                <NavFrontendSpinner />
                            ) : (
                                <>
                                    <BindersIkon className={'vedlegg-liste__binders-ikon'} />
                                    <a
                                        className={'nav-frontend-lenker vedlegg-liste__lenke'}
                                        target={'_blank'}
                                        rel={'noopener noreferer'}
                                        href={
                                            erSafari
                                                ? 'javascript:void(0)'
                                                : window.URL.createObjectURL(v.fil)
                                        }
                                        onClick={() => {
                                            if (erSafari) {
                                                const blob = new Blob([v.fil], {
                                                    type: v.fil.type,
                                                });
                                                const url = window.URL.createObjectURL(blob);
                                                window.open(url, '_blank');
                                            }
                                        }}
                                    >
                                        {v.filnavn}
                                    </a>

                                    <Flatknapp
                                        className={'vedlegg-liste__slett-knapp'}
                                        onClick={() => onDelete(v.filreferanse)}
                                    >
                                        <></>
                                    </Flatknapp>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export { VedleggListe };
