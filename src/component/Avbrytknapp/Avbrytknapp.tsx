import { Flatknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IAvbrytKnappProps {
    className?: string;
    openModal: () => void;
}

type AvbrytKnappProps = IAvbrytKnappProps;

const Avbrytknapp: React.StatelessComponent<AvbrytKnappProps> = ({ className, openModal }) => {
    return (
        <Flatknapp className={className} onClick={openModal}>
            <FormattedMessage id={'app.avbryt'} />
        </Flatknapp>
    );
};

export default Avbrytknapp;
