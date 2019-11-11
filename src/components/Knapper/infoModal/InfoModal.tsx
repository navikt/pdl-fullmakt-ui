import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

interface InfoModalProps {
  showHide: boolean;
  setShowHide: any;
  message: any;
}

const InfoModal = ({ showHide, message, setShowHide }: InfoModalProps) => {
  return (
    <div className={'infoModal'}>
      <Modal
        isOpen={showHide}
        onRequestClose={() => setShowHide(!showHide)}
        closeButton={false}
        contentLabel='Info modal'
        className='infoModal__modal'
        {...{ ariaHideApp: false }}
      >
        <div
          className={'infoModal__innhold'}
          role={'document'}
          tabIndex={0}
          aria-describedby={'description_infoModal_modal'}
        >
          <div id='description_infoModal_modal'>
            <FormattedHTMLMessage id={message} />
            <p>{message}</p>
          </div>
          <Knapp className={'infoModal__knapp'} onClick={() => setShowHide(!showHide)}>
            OK
          </Knapp>
        </div>
      </Modal>
    </div>
  );
};
export default InfoModal;
