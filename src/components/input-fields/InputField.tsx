import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import React, { useState } from 'react';

interface Props extends Omit<NavFrontendInputProps, 'onChange'> {
  onChange: (value: string) => void;
  value: string;
  error: string | null;
  submitted: boolean;
}

const InputField = (props: Props) => {
  const { onChange, error, submitted, ...newProps } = props;
  const [blur, settBlur] = useState(false);

  return (
    <Input
      onChange={event => onChange(event.currentTarget.value)}
      feil={error && (submitted || blur) ? { feilmelding: error } : undefined}
      onBlur={() => settBlur(true)}
      {...newProps}
    />
  );
};

export default InputField;
