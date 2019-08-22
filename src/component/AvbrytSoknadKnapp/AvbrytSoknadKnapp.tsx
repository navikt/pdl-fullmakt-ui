import { Fareknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { IRootState } from '../../rootReducer';

declare global {
    /* tslint:disable:interface-name */
    interface Window {
        frontendlogger: any;
    }
    /* tslint:enable:interface-name */
}

interface IAvbrytSoknadKnappProps {
    className?: string;
}

interface IMapStateToProps {
    steg: number;
}

type AvbrytSoknadKnappProps = IAvbrytSoknadKnappProps & IMapStateToProps;

const loggMetrikkerOgAvbryt = (steg: number) => {
    if (window.frontendlogger) {
        window.frontendlogger.event('pdl-fullmakt-ui-status', {}, { status: 'avbrutt', steg });
    }

    window.location.href = 'https://tjenester.nav.no/dittnav/innlogget';
};

const AvbrytSoknadKnapp: React.StatelessComponent<AvbrytSoknadKnappProps> = ({
    className,
    steg,
}) => {
    return (
        <Fareknapp className={className} onClick={() => loggMetrikkerOgAvbryt(steg)}>
            <FormattedMessage id={'app.avbrytmodal.avbryt'} />
        </Fareknapp>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        steg: selectAppSteg(state),
    };
};

export default connect(mapStateToProps)(AvbrytSoknadKnapp);
