import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import React from 'react';

interface Props extends Omit<RadioPanelGruppeProps, 'onChange'> {
  onChange: (value: any) => void;
  error: string | null;
  submitted: boolean;
}

const RPG = (props: Props) => {
  const { onChange, submitted, error, ...newProps } = props;

  return (
    <div className="rpg__rad">
      <RadioPanelGruppe
        onChange={(event: React.SyntheticEvent<EventTarget>, value: string) =>
          onChange(value)
        }
        feil={submitted && error ? { feilmelding: error } : undefined}
        {...newProps}
      />
    </div>
  );
};

export default RPG;
