import { Fareknapp } from 'nav-frontend-knapper';
import * as React from 'react';

interface FortsettKnappProps {
  className?: string;
  closeModal: any;
}

const Fortsettknapp = ({ className, closeModal }: FortsettKnappProps) => {
  return (
    <Fareknapp className={className} onClick={(e) => closeModal(e)} type={'standard'}>
      {'Ja, avslutt fullmakten'}
    </Fareknapp>
  );
};

export default Fortsettknapp;
