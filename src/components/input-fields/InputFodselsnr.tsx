import { Input } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import { useStore } from '../../providers/Provider';

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  error: string | null;
  value: string;
}

const InputFodselsnr = (props: Props) => {
  const [{ auth, fodselsnr }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, error, submitted } = props;

  if (auth.authenticated && fodselsnr !== value) {
    props.onChange(fodselsnr);
  }

  return auth.authenticated && fodselsnr ? (
    <Input label={'Fødselsnummer'} value={value} disabled={true} />
  ) : (
    <Input
      label={'Fødselsnummer'}
      value={value}
      onChange={event => props.onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
    />
  );
};

export default InputFodselsnr;
