import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { hentFeltMedFeil } from '../../common/utils';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import { IFamilieforhold } from '../../soknad/types';

interface IProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
}

type AnnenForelderInfoProps = IProps & InjectedIntlProps;

const AnnenForelderInfo: React.StatelessComponent<AnnenForelderInfoProps> = ({
    familieforhold,
    intl,
    harForsoktNesteSteg,
    settAnnenForelderNavn,
    settAnnenForelderFodselsnummer,
}) => {
    const feltMedFeil = hentFeltMedFeil(familieforhold, harForsoktNesteSteg, intl);
    return (
        <SoknadPanel>
            <Input
                name="annenForelder.navn"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.navn.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderNavn((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderNavn.verdi}
                feil={feltMedFeil.annenForelderNavn}
                maxLength={50}
            />
            <Input
                name="annenforelder.fodselsnummer"
                label={intl.formatMessage({
                    id: 'familieforhold.annenForelder.fodselsnummer.placeholder',
                })}
                onBlur={(event: React.SyntheticEvent<EventTarget>) => {
                    settAnnenForelderFodselsnummer((event.target as HTMLInputElement).value);
                }}
                defaultValue={familieforhold.annenForelderFodselsnummer.verdi}
                feil={feltMedFeil.annenForelderFodselsnummer}
                type={'tel'}
                autoComplete={'off'}
                maxLength={11}
            />
        </SoknadPanel>
    );
};

export default injectIntl(AnnenForelderInfo);
