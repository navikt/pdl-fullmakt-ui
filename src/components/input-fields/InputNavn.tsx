import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, error, submitted, onChange } = props;

  if (auth.authenticated && auth.name !== props.value) {
    onChange(auth.name);
  }

  return auth.authenticated ? (
    <Input label={"Innsenders navn"} value={value} disabled={true} />
  ) : (
    <Input
      label={"Innsenders navn"}
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
    />
  );
};

export default InputNavn;
