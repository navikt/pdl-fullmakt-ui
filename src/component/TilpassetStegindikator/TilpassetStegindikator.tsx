import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import * as React from 'react';
import { ISteg, stegConfig } from '../../stegConfig';
import MobilStegindikator from './MobilStegindikator';

interface ITilpassetStegindikatorProps {
    aktivtSteg: number;
}

const TilpassetStegindikator: React.StatelessComponent<ITilpassetStegindikatorProps> = ({
    aktivtSteg,
}) => {
    const indikatorsteg: StegindikatorStegProps[] = Object.values(stegConfig)
        .filter((steg: ISteg) => steg.stegIndeks !== 0)
        .map((steg: ISteg) => {
            return {
                aktiv: aktivtSteg === steg.stegIndeks,
                index: steg.stegIndeks,
                label: steg.key,
            };
        });

    return (
        <div className={'tilpasset-stegindikator'}>
            <div className={'tilpasset-stegindikator__normal'}>
                <Stegindikator
                    steg={indikatorsteg}
                    autoResponsiv={true}
                    visLabel={false}
                    kompakt={false}
                    aktivtSteg={aktivtSteg - 1} // -1 pga Stegindikator er 0-indeksert
                />
            </div>
            <MobilStegindikator antallSteg={indikatorsteg.length} aktivtSteg={aktivtSteg} />
        </div>
    );
};

export default TilpassetStegindikator;
