import React, { useEffect, useState } from 'react';
import { fetchOmraade } from '../../../clients/apiClient';
import { HTTPError } from '../../error/Error';
import NAVSelect from '../select/NAVSelect';
import omraade from '../../../clients/apiMock/data/omraade.json';

interface Props {
  option: OptionType;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: OptionType) => void;
  hjelpetekst?: string;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Omraade {
  sortering: number;
  kode: string;
  term: string;
  tekst: string;
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
          settValutaer(omraade); // delete it later
        })
        .then(() => {
          settLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapKoderToOptions = (koder: Omraade[]): any =>
    koder.map(k => ({
      label: k.term + ': ' + k.tekst,
      value: k.kode
    }));

  const options = mapKoderToOptions(
    valutaer.sort((a: Omraade, b: Omraade) => (a.sortering < b.sortering ? -1 : 1))
  );

  return (
    <NAVSelect
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      option={props.option}
      submitted={props.submitted}
      onChange={props.onChange}
      hjelpetekst={props.hjelpetekst}
      apiData={valutaer}
    />
  );
};

export default SelectOmraade;
