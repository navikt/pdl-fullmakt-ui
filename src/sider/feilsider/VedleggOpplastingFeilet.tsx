import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import { IRootState } from '../../rootReducer';
import Feilside from './Feilside';

interface IMapStateToProps {
    status: AppStatus;
}
type VedleggOpplastingFeiletProps = IMapStateToProps & InjectedIntlProps;

const VedleggOpplastingFeilet: React.FunctionComponent<VedleggOpplastingFeiletProps> = ({
    status,
    intl,
}) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.feilside.opplasting',
        });
    }
    if (status === AppStatus.FEILSITUASJON) {
        return (
            <Feilside
                ikon={<Veilederikon />}
                tekster={{
                    feilmelding: 'feilside.opplasting.feilmelding',
                    tittel: 'feilside.opplasting.tittel',
                }}
                knapp={<></>}
            />
        );
    }
    return <Redirect to={'/'} />;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        status: selectAppStatus(state),
    };
};

export default injectIntl(connect(mapStateToProps)(VedleggOpplastingFeilet));
