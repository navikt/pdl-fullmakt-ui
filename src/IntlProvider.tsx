import * as moment from 'moment-timezone';
import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';
import { connect } from 'react-redux';
import { selectValgtSprak } from './app/selectors';
import { ISprak } from './app/types';
import { selectLand } from './land/selectors';
import { ILandBundle } from './land/types';
import { IRootState } from './rootReducer';
import { selectTekster } from './tekster/selectors';
import { ITeksterBundle } from './tekster/types';

addLocaleData(nb);
addLocaleData(nn);

interface IOwnProps {
    children: React.ReactNode;
}

interface IMapStateToProps {
    tekster: ITeksterBundle;
    land: ILandBundle;
    valgtSprak: ISprak;
}

type Props = IOwnProps & IMapStateToProps;

const IntlProvider: React.StatelessComponent<Props> = ({ children, land, tekster, valgtSprak }) => {
    moment.locale(valgtSprak);
    moment.tz(moment.tz.guess());

    const landPaSprak = new Map(Object.entries(land)).get(valgtSprak);
    const teksterPaSprak = new Map(Object.entries(tekster)).get(valgtSprak);

    return (
        <Provider
            messages={{ ...landPaSprak, ...teksterPaSprak }}
            defaultLocale={ISprak.nb}
            locale={valgtSprak}
        >
            {children}
        </Provider>
    );
};

function mapStateTorProps(state: IRootState): IMapStateToProps {
    return {
        land: selectLand(state),
        tekster: selectTekster(state),
        valgtSprak: selectValgtSprak(state),
    };
}

export default connect(mapStateTorProps)(IntlProvider);
