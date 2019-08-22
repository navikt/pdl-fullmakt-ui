import Spinner from 'nav-frontend-spinner';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectAppStatus } from './app/selectors';
import { AppStatus } from './app/types';
import { IRootState } from './rootReducer';
import { Routes } from './Routes';

interface IMapStateToProps {
    status: AppStatus;
}

type Props = IMapStateToProps & RouteComponentProps<{}>;

const App: React.StatelessComponent<Props> = ({ status }) => {
    switch (status) {
        case AppStatus.IKKE_STARTET:
        case AppStatus.STARTER:
            return <Spinner className={'app__spinner'} type={'XXL'} />;
        default:
            return <Routes />;
    }
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default withRouter(connect(mapStateToProps)(App));
