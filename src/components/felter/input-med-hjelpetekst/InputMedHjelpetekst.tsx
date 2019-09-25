import React from 'react';
import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import { HjelpetekstHoyre } from 'nav-frontend-hjelpetekst';

type InputProps = Omit<NavFrontendInputProps, 'onChange'>;
interface Props extends InputProps {
  value: string;
  error: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
  hjelpetekst?: string;
}

const EndreKontonummerFelt = ({
  value,
  onChange,
  submitted,
  error,
  label,
  hjelpetekst,
  ...restProps
}: Props) => {
  return (
    <>
      <div className="ekf__header">
        {label && <div className="skjemaelement__label">{label}</div>}
        {hjelpetekst && (
          <HjelpetekstHoyre tittel={''} id={'hjelpetekst'} type="auto">
            <div>{hjelpetekst}</div>
          </HjelpetekstHoyre>
        )}
      </div>
      <div className="ekf__input">
        <Input
          label={''}
          value={value}
          onChange={e => onChange(e.target.value)}
          feil={submitted && error ? { feilmelding: error } : undefined}
          {...restProps}
        />
      </div>
    </>
  );
};

export default EndreKontonummerFelt;
