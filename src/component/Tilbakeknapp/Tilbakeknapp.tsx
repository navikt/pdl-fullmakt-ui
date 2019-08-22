import * as classNames from 'classnames';
import NavFrontendChevron from 'nav-frontend-chevron';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appForrigeSteg } from '../../app/actions';

interface ITilbakeknappProps {
    posisjon: 'oppe' | 'nede';
}

interface IMapDispatchToProps {
    forrigeSteg: () => void;
}

type TilbakeknappProps = ITilbakeknappProps & IMapDispatchToProps;

const Tilbakeknapp: React.StatelessComponent<TilbakeknappProps> = ({ forrigeSteg, posisjon }) => {
    return (
        <KnappBase
            className={classNames('tilbakeknapp', `tilbakeknapp__${posisjon}`)}
            type={posisjon === 'oppe' ? 'flat' : 'standard'}
            onClick={forrigeSteg}
        >
            {posisjon === 'oppe' && (
                <NavFrontendChevron type="venstre" className={'tilbakeknapp__ikon'} />
            )}
            <FormattedMessage id={'app.tilbake'} />
        </KnappBase>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        forrigeSteg: () => dispatch(appForrigeSteg()),
    };
};

export default connect(
    () => ({}),
    mapDispatchToProps
)(Tilbakeknapp);
