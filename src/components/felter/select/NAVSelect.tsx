import React from 'react';
import Select from 'react-select';
import NavFrontendSpinner from 'nav-frontend-spinner';
import cls from 'classnames';
import { NedChevron } from 'nav-frontend-chevron';
import { Input } from 'nav-frontend-skjema';
import { FormatOptionLabelMeta } from 'react-select/base';
import { HjelpetekstHoyre } from 'nav-frontend-hjelpetekst';

interface Props {
  value: OptionType[];
  submitted: boolean;
  label: string;
  options: OptionType[];
  error: string | null;
  fetchError: boolean;
  hjelpetekst?: string;
  onChange: (value?: OptionType[]) => void;
  borderUnderFirst?: boolean;
  loading?: boolean;
  defineLabel?: (
    option: OptionType,
    context: FormatOptionLabelMeta<OptionType>
  ) => string;
  apiData?: Object[];
}

interface OptionType {
  value: string;
  label: string;
}

const LoadingIndicator = () => (
  <NavFrontendSpinner
    type='XS'
    negativ={true}
    stroke={true}
    className='KodeverkSelect__spinner'
  />
);

const DropdownIndicator = (props: any) => (
  <div className='KodeverkSelect__dropdown-indicator'>
    <NedChevron />
  </div>
);

const NAVSelect = (props: Props) => {
  const controlClasses = cls({
    'KodeverkSelect__control-feil': props.submitted && props.error
  });

  const containerClasses = cls({
    skjemaelement: true,
    KodeverkSelect: true,
    KodeverkSelect__borderUnderFirst: props.borderUnderFirst
  });

  const value =
    props.value && props.value.length > 0
      ? props.options.filter((option: OptionType) =>
          props.value.find(v => option.value === v.value)
        )
      : [];

  const onChange = (option: OptionType[]) => {
    if (option) {
      props.onChange(option);
    }
  };

  const valueFormatted: OptionType[] =
    value && value.length > 0
      ? value.map(v => ({
          value: v.value || '',
          label: v.label.split(':').shift() || ''
        }))
      : [];

  return !props.fetchError ? (
    <div className={containerClasses}>
      <div className='KodeverkSelect__header'>
        {props.label && <div className='skjemaelement__label'>{props.label}</div>}
        {props.hjelpetekst && (
          <HjelpetekstHoyre tittel={''} id={'hjelpetekst'}>
            <div>
              {props.hjelpetekst}
              {props.apiData &&
                props.apiData.map((k: any) => (
                  <div key={k.kode}>
                    {k.kode} => {k.term}: {k.tekst}
                  </div>
                ))}
            </div>
          </HjelpetekstHoyre>
        )}
      </div>
      <div className={cls('KodeverkSelect--select-wrapper')}>
        <Select
          value={valueFormatted}
          // defaultValue={valueFormatted}
          label={props.label}
          placeholder='Søk...'
          classNamePrefix='KodeverkSelect'
          loadingMessage={() => 'Laster inn...'}
          noOptionsMessage={v => `Ingen treff funnet for ${v.inputValue}...`}
          className={controlClasses}
          isLoading={props.loading}
          options={props.options}
          formatOptionLabel={props.defineLabel}
          // onMenuOpen={() => props.onChange(undefined)}
          components={{ LoadingIndicator, DropdownIndicator }}
          onChange={onChange as any}
          isMulti={true}
          clearable={false}
          closeOnSelect={true}
          removeSelected={false}
        />
      </div>
      {props.submitted && props.error && (
        <div role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
          {props.error}
        </div>
      )}
    </div>
  ) : (
    <Input
      label={props.label}
      value={props.value && props.value.map(v => v.value)}
      onChange={e => props.onChange([{ label: props.label, value: e.target.value }])}
      feil={props.submitted && props.error ? { feilmelding: props.error } : undefined}
      placeholder={'+'}
    />
  );
};

export default NAVSelect;
