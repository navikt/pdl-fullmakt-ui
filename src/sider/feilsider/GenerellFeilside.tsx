import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import { InnsendingFeiletIkon } from '../../component/Ikoner/InnsendingFeiletIkon';
import { IRootState } from '../../rootReducer';
import Feilside from './Feilside';

interface IMapStateToProps {
    status: AppStatus;
}

type GenerellFeilsideProps = IMapStateToProps & InjectedIntlProps;

const GenerellFeilside: React.StatelessComponent<GenerellFeilsideProps> = ({ status, intl }) => {
    if (intl) {
        document.title = intl.formatMessage({
            defaultMessage: 'Fullmakt - Feilside',
            id: 'app.tittel.feilside',
        });
    }
    if (status === AppStatus.FEILSITUASJON) {
        return (
            <Feilside
                ikon={<InnsendingFeiletIkon />}
                tekster={{
                    feilmelding: 'feilside.generell.feilmelding',
                    tittel: 'feilside.generell.tittel',
                }}
            />
        );
    } else {
        return <Redirect to={'/'} />;
    }
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default injectIntl(connect(mapStateToProps)(GenerellFeilside));
