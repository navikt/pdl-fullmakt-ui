import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Svar } from '../../soknad/types';

interface IJaNeiSvar {
    verdi: string;
}

const JaNeiSvar: React.StatelessComponent<IJaNeiSvar> = ({ verdi }) => {
    let tekstnokkel = 'svar.ubesvart';
    switch (verdi) {
        case Svar.JA:
            tekstnokkel = 'svar.ja';
            break;
        case Svar.NEI:
            tekstnokkel = 'svar.nei';
            break;
    }

    return <FormattedMessage id={tekstnokkel} />;
};

export { JaNeiSvar };
