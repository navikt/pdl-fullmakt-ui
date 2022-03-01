import React, { useState } from 'react';
import Modal from 'nav-frontend-modal';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import sporsmalIkon from '../../assets/Sporsmalstegn.svg';

interface Props {
  id?: string;
  tekst?: string;
  maxWidth?: number;
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
}

Modal.setAppElement('#app');
const Hjelpetekst = (props: Props) => {
  const [anker, setAnker] = useState<HTMLElement | undefined>(undefined);
  return (
    <div>
      <div className='hjelpetekst' onClick={(e) => setAnker(e.currentTarget)}>
        <div className='hjelpetekst__apneknapp'>
          <img alt={'sporsmalIkon'} src={sporsmalIkon} />
        </div>
      </div>

      <Popover
        ankerEl={anker}
        onRequestClose={() => setAnker(undefined)}
        orientering={PopoverOrientering.OverVenstre}
      >
        <p style={{ margin: '1rem', maxWidth: props.maxWidth ?? 350 }}>{props.tekst}</p>
      </Popover>
    </div>
  );
};

export default Hjelpetekst;
