import * as React from 'react';
import ModalHjelpetekst from '../ModalHjelpetekst/ModalHjelpetekst';

interface IHjelpetekstContainerProps {
    tittel: React.ReactNode;
    hjelpetekstNokkel: string;
}

const HjelpetekstContainer: React.StatelessComponent<IHjelpetekstContainerProps> = ({
    tittel,
    hjelpetekstNokkel,
}) => {
    return (
        <div className={'hjelpetekst-container'}>
            <h3 className={'typo-innholdstittel side-container__sidetittel'}>{tittel}</h3>
            <ModalHjelpetekst
                ariaContentLabel={hjelpetekstNokkel + '.label'}
                className={'hjelpetekst-container__hjelpetekst'}
                modalClassName={'hjelpetekst-container__modal'}
                hjelpetekstNokkel={hjelpetekstNokkel}
            />
        </div>
    );
};

export default HjelpetekstContainer;
