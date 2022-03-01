import React from 'react';
import { Input, InputProps as NavFrontendInputProps } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Controller } from 'react-hook-form';

type InputProps = Omit<NavFrontendInputProps, 'onChange'>;
interface Props extends InputProps {
  name: string;
  control: Control<FieldValues, object | unknown>;
  label: string;
  value?: string;
  placeholder?: string;
  hjelpetekst?: string;
  disabled?: boolean;
}

const Felt = ({ name, control, label, placeholder, hjelpetekst, disabled }: Props) => {
  return (
    <>
      <div className='ekf__header'>
        {label && <div className='skjemaelement__label'>{label}</div>}
        {hjelpetekst && (
          <Hjelpetekst tittel={''} id={'hjelpetekst'}>
            <div>{hjelpetekst}</div>
          </Hjelpetekst>
        )}
      </div>
      <div className='ekf__input'>
        <Controller
          name={name}
          control={control}
          defaultValue={''}
          render={({ field }) => {
            return <Input placeholder={placeholder} disabled={disabled} {...field} />;
          }}
        />
      </div>
    </>
  );
};

export default Felt;
