import Modal from 'nav-frontend-modal';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import Avbrytknapp from '../Avbrytknapp/Avbrytknapp';
import Fortsettknapp from '../Fortsettknapp/Fortsettknapp';
import { opphoertMelding } from '../../../utils/konstanter';

interface Interface {
  showHide: boolean;
  setShowHide: any;
  handleConfirm: any;
}
const Navigasjon = ({ showHide, handleConfirm, setShowHide }: Interface) => {
  return (
    <section className={'navigasjon'}>
      <Modal
        isOpen={showHide}
        onRequestClose={() => setShowHide(!showHide)}
        closeButton={true}
        contentLabel='Opphør fullmakt'
        className='modal'
        {...{ ariaHideApp: false }}
      >
        <div className={'modal__advarseltekst'}>
          <Normaltekst>{opphoertMelding}</Normaltekst>
        </div>
        <Fortsettknapp className={'modal__avbrytknapp'} closeModal={handleConfirm} />

        <Avbrytknapp
          className={'modal__fortsettknapp'}
          openModal={() => setShowHide(!showHide)}
        />
      </Modal>
    </section>
  );
};
export default Navigasjon;
