import Modal from 'nav-frontend-modal';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Avbrytknapp from '../Avbrytknapp/Avbrytknapp';
import AvbrytSoknadKnapp from '../AvbrytSoknadKnapp/AvbrytSoknadKnapp';
import Fortsettknapp from '../Fortsettknapp/Fortsettknapp';
import Submitknapp from '../Submitknapp/Submitknapp';
import Tilbakeknapp from '../Tilbakeknapp/Tilbakeknapp';

interface INavigasjonState {
    isOpen: boolean;
}

/* tslint:disable */
interface INavigasjonsProps {}
/* tslint:enable */

type NavigasjonProps = INavigasjonsProps & InjectedIntlProps;

class Navigasjon extends React.Component<NavigasjonProps, INavigasjonState> {
    constructor(props: NavigasjonProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    public render() {
        const { intl } = this.props;

        return (
            <div className={'navigasjon'}>
                <Avbrytknapp
                    className={'navigasjon__knapp navigasjon__knapp--avbryt'}
                    openModal={this.openModal}
                />
                <Tilbakeknapp posisjon={'nede'} />
                <Submitknapp className={'navigasjon__knapp navigasjon__knapp--neste'} />
                <Modal
                    role={'dialog'}
                    aria-modal={'true'}
                    className={'avbrytmodal'}
                    isOpen={this.state.isOpen}
                    contentLabel={intl.formatMessage({ id: 'app.avbrytmodal.tekst' })}
                    onRequestClose={this.closeModal}
                >
                    <div className={'avbrytmodal__advarseltekst'}>
                        <Normaltekst>
                            <FormattedMessage id={'app.avbrytmodal.tekst'} />
                        </Normaltekst>
                    </div>
                    <AvbrytSoknadKnapp className={'avbrytmodal__avbrytknapp'} />

                    <Fortsettknapp
                        className={'avbrytmodal__fortsettknapp'}
                        closeModal={this.closeModal}
                    />
                </Modal>
            </div>
        );
    }

    private openModal() {
        const footer = document.querySelector('body > .hodefot');
        if (footer) {
            footer.setAttribute('aria-hidden', 'true');
        }
        this.setState({
            isOpen: true,
        });
    }

    private closeModal() {
        const footer = document.querySelector('body > .hodefot');
        if (footer) {
            footer.removeAttribute('aria-hidden');
        }
        this.setState({
            isOpen: false,
        });
    }
}

export default injectIntl(Navigasjon);
