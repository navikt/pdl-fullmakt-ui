import React, { useEffect, useState } from 'react';
import { fetchOmraade } from '../../../clients/apiClient';
import { HTTPError } from '../../error/Error';
import NAVSelect from '../select/NAVSelect';
import { Omraade } from '../../../types/omraade';

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: string) => void;
  hjelpetekst?: string;
}

interface OptionType {
  value: string;
  label: string;
}

const SelectOmraade = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [valutaer, settValutaer] = useState([] as Omraade[]);
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    if (!loading) {
      settLoading(true);
      fetchOmraade()
        .then(v => {
          v && settValutaer(v);
        })
        .catch((error: HTTPError) => {
          settFetchError(error);
        })
        .then(() => {
          settLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapKoderToOptions = (koder: Omraade[]): OptionType[] =>
    koder.map(k => ({
      label: k.term + ': ' + k.tekst,
      value: k.kode
    }));

  const sortOmraade = (omraader: Omraade[]): Omraade[] =>
    omraader.sort((a: Omraade, b: Omraade) => (a.sortering < b.sortering ? -1 : 1));

  const sortOptionsByValue = (options: OptionType[]): OptionType[] =>
    options.sort((a: OptionType, b: OptionType) => (a.value < b.value ? -1 : 1));

  const options = mapKoderToOptions(sortOmraade(valutaer));

  const valueToOptionType: OptionType[] = props.value
    ? props.value.split(';').map(s => ({ value: s, label: s }))
    : [];

  return (
    <NAVSelect
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      value={valueToOptionType}
      submitted={props.submitted}
      onChange={v =>
        props.onChange(
          v && v.length > 0
            ? sortOptionsByValue(v)
                .map(o => {
                  console.log('on change value = ', JSON.stringify(v));
                  return o.value;
                })
                .join(';')
            : undefined
        )
      }
      hjelpetekst={props.hjelpetekst}
      apiData={valutaer}
    />
  );
};

export default SelectOmraade;
