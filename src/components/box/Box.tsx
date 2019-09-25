import React from 'react';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Modal from 'nav-frontend-modal';
import ScrollableAnchor from 'react-scrollable-anchor';

interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

Modal.setAppElement('#app');
const Box = (props: Props) => {
  const { tittel, beskrivelse, icon, children, id } = props;

  return (
    <div className="box__wrapper">
      <ScrollableAnchor id={id}>
        <Veilederpanel
          svg={<img src={icon} className="box__ikon" alt="Veileder" />}
          type={'plakat'}
          kompakt={true}
        >
          <div className="box__container">
            <div className="box__header">
              <Sidetittel>{tittel}</Sidetittel>
              <Undertittel>{beskrivelse}</Undertittel>
            </div>
            <div className="box__content">{children}</div>
          </div>
        </Veilederpanel>
      </ScrollableAnchor>
    </div>
  );
};

export default Box;
