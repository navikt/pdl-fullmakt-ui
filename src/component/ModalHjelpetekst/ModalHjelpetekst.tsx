import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Anchor from './Anchor';

interface IModalHjelpetekstState {
    isOpen: boolean;
    hover: boolean;
}

interface IModalHjelpetekstProps {
    hjelpetekstNokkel: string;
    ariaContentLabel: string;
    className?: string;
    modalClassName?: string;
}

class ModalHjelpetekst extends React.Component<IModalHjelpetekstProps, IModalHjelpetekstState> {
    constructor(props: IModalHjelpetekstProps) {
        super(props);
        this.state = {
            hover: false,
            isOpen: false,
        };
    }

    public render() {
        const { hjelpetekstNokkel, ariaContentLabel, className, modalClassName } = this.props;
        return (
            <div className={className}>
                <button
                    name={'hjelpetekst'}
                    type="button"
                    className={'hjelpetekst__apneknapp'}
                    aria-haspopup={'dialog'}
                    onClick={this.openModal}
                    onMouseEnter={this.setHover(true)}
                    onMouseLeave={this.setHover(false)}
                >
                    <Anchor hover={this.state.hover} className={'hjelpetekst__anchor'} />
                </button>
                <Modal
                    role={'dialog'}
                    isOpen={this.state.isOpen}
                    contentLabel={ariaContentLabel}
                    onRequestClose={this.closeModal}
                    className={modalClassName}
                >
                    <div className={'modal-tekst-container'} tabIndex={0} role={'document'}>
                        <p>
                            <FormattedHTMLMessage id={hjelpetekstNokkel} />
                        </p>
                    </div>
                </Modal>
            </div>
        );
    }

    private openModal = () => {
        const footer = document.querySelector('body > .hodefot');
        if (footer) {
            footer.setAttribute('aria-hidden', 'true');
        }
        this.setState({
            isOpen: true,
        });
    };

    private closeModal = () => {
        const footer = document.querySelector('body > .hodefot');
        if (footer) {
            footer.removeAttribute('aria-hidden');
        }
        this.setState({
            isOpen: false,
        });
    };

    private setHover = (value: boolean) => {
        return () => this.setState({ hover: value });
    };
}

export default ModalHjelpetekst;
