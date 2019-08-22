import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IMineBarn, Svar } from '../../soknad/types';
import { stegConfig } from '../../stegConfig';
import OppsummeringsAdvarsel from './OppsummeringsAdvarsel';
import OppsummeringSteg from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnOppsummeringProps {
    barn: IMineBarn;
}

const BarnOppsummering: React.StatelessComponent<IBarnOppsummeringProps> = ({ barn }) => {
    return (
        <OppsummeringSteg stegIndeks={stegConfig.mineBarn.stegIndeks}>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'barn.tittel'} />}
                svar={`${barn.navn.verdi} - ${barn.fodselsdato.verdi}`}
            />
            {barn.erFlerling.verdi === Svar.JA && (
                <OppsummeringsAdvarsel meldingsNokkel={'advarsel.flerebarn.utenlink'} />
            )}
        </OppsummeringSteg>
    );
};

export { BarnOppsummering };
