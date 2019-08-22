import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IFortsettKnappProps {
    className?: string;
    closeModal: () => void;
}

type FortsettKnappProps = IFortsettKnappProps;

const Fortsettknapp: React.StatelessComponent<FortsettKnappProps> = ({ className, closeModal }) => {
    return (
        <KnappBase className={className} onClick={closeModal} type={'standard'}>
            <FormattedMessage id={'app.avbrytmodal.fortsett'} />
        </KnappBase>
    );
};

export default Fortsettknapp;
