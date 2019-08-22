import * as classNames from 'classnames';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ValideringsStatus } from '../../soknad/types';
import { IVedlegg } from '../../vedlegg/types';
import VedleggKnapp from './VedleggKnapp';
import { VedleggListe } from './VedleggListe';

const cls = (className?: string) => classNames('skjemaelement', className);

interface IVedleggProps {
    className?: string;
    feil: {
        status: string;
        meldingsNokkel: string;
    };
    harForsoktNesteSteg: boolean;
    id?: string;
    label: React.ReactNode;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (filreferanse: string) => void;
    sporsmal: React.ReactNode;
    vedlegg: IVedlegg[];
}

class Vedlegg extends React.Component<IVedleggProps> {
    constructor(props: IVedleggProps) {
        super(props);
    }

    public render() {
        const {
            className,
            id,
            label,
            onChange,
            vedlegg,
            onDelete,
            feil,
            sporsmal,
            harForsoktNesteSteg,
        } = this.props;

        const inputId = id || name || guid();

        return (
            <div className={cls(className)}>
                <Element className={'vedlegg__sporsmal'}>{sporsmal}</Element>
                <p className={'skjemaelement__label vedlegg__label'}>{label}</p>
                <VedleggKnapp onChange={onChange} inputId={inputId} />
                {feil.status === ValideringsStatus.ADVARSEL && (
                    <AlertStripeInfo
                        children={<FormattedMessage id={feil.meldingsNokkel} />}
                        className={'vedlegg__advarsel'}
                    />
                )}
                <VedleggListe vedlegg={vedlegg} onDelete={onDelete} />
                {feil.status === ValideringsStatus.FEIL && harForsoktNesteSteg && (
                    <SkjemaelementFeilmelding
                        feil={{ feilmelding: <FormattedMessage id={feil.meldingsNokkel} /> }}
                    />
                )}
            </div>
        );
    }
}

export { Vedlegg };
