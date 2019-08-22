import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectAppStatus, selectAppSteg, selectValgtSprak } from '../../app/selectors';
import { AppStatus, ISprak } from '../../app/types';
import { selectSenderInn } from '../../innsending/selectors';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg } from '../../soknad/actions';
import { stegConfig } from '../../stegConfig';

interface ISubmitKnappProps {
    className?: string;
}

interface IMapStateToProps {
    senderinn: boolean;
    status: AppStatus;
    stegPosisjon: number;
    valgtSprak: ISprak;
}

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type SubmitKnappProps = ISubmitKnappProps & IMapStateToProps & IMapDispatchToProps;

const Submitknapp: React.StatelessComponent<SubmitKnappProps> = ({
    className,
    nesteSteg,
    senderinn,
    status,
    stegPosisjon,
}) => {
    const erVeiledningsSteg = stegConfig.veiledning.stegIndeks === stegPosisjon;
    const erOppsummeringsSteg = stegConfig.oppsummering.stegIndeks === stegPosisjon;
    const innsendingFeilet = erOppsummeringsSteg && status === AppStatus.FEILSITUASJON;

    const label = innsendingFeilet
        ? 'app.sendSoknad.gjenta'
        : erOppsummeringsSteg
        ? 'app.sendSoknad'
        : erVeiledningsSteg
        ? 'veiledningsside.knapp'
        : 'app.neste';

    return (
        <KnappBase spinner={senderinn} className={className} type="hoved" onClick={nesteSteg}>
            <FormattedMessage id={label} />
        </KnappBase>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        senderinn: selectSenderInn(state),
        status: selectAppStatus(state),
        stegPosisjon: selectAppSteg(state),
        valgtSprak: selectValgtSprak(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submitknapp);
