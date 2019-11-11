import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

interface InfoModalProps {
  showHide: boolean;
  setShowHide: any;
  message: any;
}

const InfoModal = ({ showHide, message, setShowHide }: InfoModalProps) => {
  const history = useHistory();
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
            <p>{message}</p>
          </div>
          <Knapp
            className={'infoModal__knapp'}
            onClick={() => {
              setShowHide(!showHide);
              history.push(`/person/pdl-fullmakt-ui`);
            }}
          >
            OK
          </Knapp>
        </div>
      </Modal>
    </div>
  );
};
export default InfoModal;
