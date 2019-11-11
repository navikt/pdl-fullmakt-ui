import { Flatknapp } from 'nav-frontend-knapper';
import * as React from 'react';

interface AvbrytKnappProps {
  className?: string;
  openModal: () => void;
}

const Avbrytknapp = ({ className, openModal }: AvbrytKnappProps) => {
  return (
    <Flatknapp className={className} onClick={openModal}>
      {'Nei, avbryt'}
    </Flatknapp>
  );
};

export default Avbrytknapp;
