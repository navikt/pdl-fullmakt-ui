import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { stegConfig } from '../../stegConfig';
import OppsummeringSteg from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

const VeiledningOppsummering: React.StatelessComponent = () => {
    return (
        <OppsummeringSteg stegIndeks={stegConfig.veiledning.stegIndeks}>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'veiledningsside.bekreftelse.tittel'} />}
                svar={
                    <FormattedHTMLMessage
                        id={'veiledningsside.bekreftelse.oppsummering.hyperlenke'}
                    />
                }
            />
        </OppsummeringSteg>
    );
};

export { VeiledningOppsummering };
