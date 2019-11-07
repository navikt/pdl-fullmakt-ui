import { Fareknapp } from 'nav-frontend-knapper';
import * as React from 'react';

interface FortsettKnappProps {
  className?: string;
  closeModal: () => void;
}

const Fortsett = (closeModal: () => void) => {
  closeModal();
};

const Fortsettknapp = ({ className, closeModal }: FortsettKnappProps) => {
  return (
    <Fareknapp
      className={className}
      onClick={() => Fortsett(closeModal)}
      type={'standard'}
    >
      {'Fortsett'}
    </Fareknapp>
  );
};

export default Fortsettknapp;
