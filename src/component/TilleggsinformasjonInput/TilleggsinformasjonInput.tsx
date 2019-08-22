import PanelBase from 'nav-frontend-paneler';
import { TextareaControlled } from 'nav-frontend-skjema';
import * as React from 'react';
import { IFeil } from '../../common/types';
import { ANTALL_LOVLIGE_TEGN_I_TEKSTFELT } from '../../common/utils';
import { IFelt } from '../../soknad/types';

interface ITilleggsinformasjonInputProps {
    className?: string;
    defaultValue: IFelt;
    feil: IFeil | undefined;
    label: string;
    onBlur: (value: string) => void;
}

type TilleggsinformasjonInputProps = ITilleggsinformasjonInputProps;

const TilleggsinformasjonInput: React.StatelessComponent<TilleggsinformasjonInputProps> = ({
    className,
    defaultValue,
    feil,
    label,
    onBlur,
}) => {
    return (
        <PanelBase className={'tilleggsinformasjon'}>
            <TextareaControlled
                label={label}
                defaultValue={defaultValue.verdi}
                maxLength={ANTALL_LOVLIGE_TEGN_I_TEKSTFELT}
                onBlur={(evt: any) => {
                    onBlur(evt.target.value);
                }}
                feil={feil}
            />
        </PanelBase>
    );
};

export default TilleggsinformasjonInput;
