import * as classNames from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { selectAppSteg } from '../../app/selectors';
import { IRootState } from '../../rootReducer';
import Navigasjon from '../Navigering/Navigasjon';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';
import TilpassetStegindikator from '../TilpassetStegindikator/TilpassetStegindikator';
import HjelpetekstContainer from './HjelpetekstContainer';

interface IOwnProps {
    className?: string;
    children: React.ReactNode;
    ikon?: React.ReactNode;
    tittel?: React.ReactNode;
    intl?: InjectedIntl;
    hjelpetekstNokkel?: string;
}

interface IMapStateToProps {
    aktivtSteg: number;
}

type Props = IOwnProps & IMapStateToProps;

class StegSide extends React.Component<Props> {
    public componentDidMount() {
        if (this.props.intl) {
            document.title =
                this.props.intl.formatMessage({
                    id: 'app.tittel.steg',
                }) +
                ' ' +
                this.props.aktivtSteg;
        }
    }

    public render() {
        const {
            aktivtSteg,
            children,
            className = '',
            ikon,
            tittel,
            hjelpetekstNokkel,
        } = this.props;

        const displayTilbakeKnapp = aktivtSteg !== 1;

        return (
            <div>
                <Undertittel className={'side-container__soknadtittel'}>
                    <FormattedMessage id={'kontantstotte.tittel'} />
                </Undertittel>

                <div className={'side-container'}>
                    <TilpassetStegindikator aktivtSteg={aktivtSteg} />

                    {displayTilbakeKnapp && <Tilbakeknapp posisjon={'oppe'} />}
                    {ikon && <div className={'side-container__ikon'}>{ikon}</div>}

                    {tittel && hjelpetekstNokkel ? (
                        <HjelpetekstContainer
                            tittel={tittel}
                            hjelpetekstNokkel={hjelpetekstNokkel}
                        />
                    ) : (
                        tittel && (
                            <h3
                                className={classNames(
                                    'typo-innholdstittel side-container__sidetittel',
                                    className
                                )}
                            >
                                {tittel}
                            </h3>
                        )
                    )}
                    <div className={classNames('side-container__children', className)}>
                        {children}
                    </div>
                    <Navigasjon />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        aktivtSteg: selectAppSteg(state),
    };
};

export default connect(mapStateToProps)(StegSide);
