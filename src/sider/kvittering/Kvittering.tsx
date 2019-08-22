import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAppStatus } from '../../app/selectors';
import { AppStatus } from '../../app/types';
import { IRootState } from '../../rootReducer';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn } from '../../soknad/types';
import KvitteringIkon from './ikoner/KvitteringIkon';
import UtvidetInfo from './UtvidetInfo';

interface IMapStateToProps {
    barn: IMineBarn;
    status: AppStatus;
}

type KvitteringProps = InjectedIntlProps & IMapStateToProps;
const Kvittering: React.StatelessComponent<KvitteringProps> = ({ intl, status }) => {
    if (intl) {
        document.title = intl.formatMessage({
            id: 'app.tittel.kvittering',
        });
    }
    if (status === AppStatus.SENDT_INN) {
        return (
            <div>
                <Undertittel className={'side-container__soknadtittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Undertittel>
                <div className="kvittering__ikon-container">
                    <KvitteringIkon className="kvittering__ikon" />
                </div>

                <h3 className="kvittering__tittel">
                    {intl.formatMessage({
                        id: 'kvittering.takkForSoknad',
                    })}
                </h3>

                <UtvidetInfo intl={intl} />
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectMineBarn(state),
        status: selectAppStatus(state),
    };
};

export default injectIntl(connect(mapStateToProps)(Kvittering));
