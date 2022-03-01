import React from 'react';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Modal from 'nav-frontend-modal';

interface Props {
  id: string;
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

Modal.setAppElement('#app');
const Box = (props: Props) => {
  const { tittel, beskrivelse, icon, children } = props;

  return (
    <div className='box__wrapper'>
      <Veilederpanel
        svg={<img src={icon} className='box__ikon' alt='Veileder' />}
        type={'plakat'}
        kompakt={true}
      >
        <div className='box__container'>
          {(tittel || beskrivelse) && (
            <div className='box__header'>
              {tittel && <Sidetittel>{tittel}</Sidetittel>}
              {beskrivelse && <Undertittel>{beskrivelse}</Undertittel>}
            </div>
          )}
          <div className='box__content'>{children}</div>
        </div>
      </Veilederpanel>
      {/*</Link>*/}
    </div>
  );
};

export default Box;
