import * as moment from 'moment-timezone';
import Lenke from 'nav-frontend-lenker';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import SuksessIkon from '../../component/Ikoner/Suksessikon';
import Environment from '../../Environment';
import { IRootState } from '../../rootReducer';

interface IUtvidedInfoProps {
    intl: InjectedIntl;
}

interface IMapStateToProps {
    innsendtDato: moment.Moment;
}

type Props = IMapStateToProps & IUtvidedInfoProps;

const UtvidetInfo: React.StatelessComponent<Props> = ({ intl, innsendtDato }) => {
    return (
        <PanelBase className="kvittering__panel" border={true}>
            <table className="kvittering__utvidettabell" cellSpacing="0">
                <tbody>
                    <tr>
                        <td className="kvittering__utvidettabell__venstrekolonne">
                            <span
                                aria-label="suksess"
                                className="kvittering__utvidettabell__alertstripe__ikon"
                            >
                                <SuksessIkon />
                            </span>
                        </td>
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({ id: 'kvittering.soknadSendt' }) +
                                    ' ' +
                                    innsendtDato.format('LLL') +
                                    '.'}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="table__left-column" />
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({
                                    id: 'kvittering.soknadLokasjon',
                                })}{' '}
                                <Lenke
                                    href={Environment().saksoversikt}
                                    children={intl.formatMessage({
                                        id: 'kvittering.saksoversikt.lenke.tekst',
                                    })}
                                />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="table__left-column" />
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({
                                    id: 'kvittering.seOgsa',
                                })}{' '}
                                <Lenke
                                    href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV"
                                    children={'saksbehandlingstidene'}
                                />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PanelBase>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        innsendtDato: state.innsending.innsendtDato,
    };
};

export default connect(mapStateToProps)(UtvidetInfo);
