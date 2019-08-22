import * as React from 'react';
import ArbeidIUtlandet from './sider/arbeid-i-utlandet/ArbeidIUtlandet';
import Barnehageplass from './sider/barnehageplass/Barnehageplass';
import Familieforhold from './sider/familieforhold/Familieforhold';
import KravTilSoker from './sider/krav-til-soker/KravTilSoker';
import MineBarn from './sider/mine-barn/MineBarn';
import Oppsummering from './sider/oppsummering/Oppsummering';
import TilknytningTilUtland from './sider/tilknytning-utland/TilknytningTilUtland';
import UtenlandskKontantstotte from './sider/utenlandsk-kontantstotte/UtenlandskKontantstotte';
import UtenlandskeYtelser from './sider/utenlandske-ytelser/UtenlandskeYtelser';
import Veiledning from './sider/veiledning/Veiledning';

interface IStegConfig {
    veiledning: ISteg;
    kravTilSoker: ISteg;
    mineBarn: ISteg;
    familieforhold: ISteg;
    utenlandskKontantstotte: ISteg;
    barnehageplass: ISteg;
    arbeidIUtlandet: ISteg;
    utenlandskeYtelser: ISteg;
    tilknytningTilUtland: ISteg;
    oppsummering: ISteg;
}

interface ISteg {
    component: React.ComponentType<any>;
    key: string;
    path: string;
    stegIndeks: number;
}

/* tslint:disable:object-literal-sort-keys */
const stegConfig: IStegConfig = {
    veiledning: {
        component: Veiledning,
        key: 'veiledning',
        path: '/',
        stegIndeks: 0,
    },
    kravTilSoker: {
        component: KravTilSoker,
        key: 'kravTilSoker',
        path: '/start',
        stegIndeks: 1,
    },
    mineBarn: {
        component: MineBarn,
        key: 'mineBarn',
        path: '/mine-barn',
        stegIndeks: 2,
    },
    barnehageplass: {
        component: Barnehageplass,
        key: 'barnehageplass',
        path: '/barnehageplass',
        stegIndeks: 3,
    },
    familieforhold: {
        component: Familieforhold,
        key: 'familieforhold',
        path: '/familieforhold',
        stegIndeks: 4,
    },
    tilknytningTilUtland: {
        component: TilknytningTilUtland,
        key: 'tilknytningTilUtland',
        path: '/tilknytning-utland',
        stegIndeks: 5,
    },
    arbeidIUtlandet: {
        component: ArbeidIUtlandet,
        key: 'arbeidIUtlandet',
        path: '/arbeid-i-utlandet',
        stegIndeks: 6,
    },
    utenlandskeYtelser: {
        component: UtenlandskeYtelser,
        key: 'utenlandskeYtelser',
        path: '/utenlandske-ytelser',
        stegIndeks: 7,
    },
    utenlandskKontantstotte: {
        component: UtenlandskKontantstotte,
        key: 'utenlandskKontantstotte',
        path: '/utenlandsk-kontantstotte',
        stegIndeks: 8,
    },
    oppsummering: {
        component: Oppsummering,
        key: 'oppsummering',
        path: '/oppsummering',
        stegIndeks: 9,
    },
};
/* tslint:enable:object-literal-sort-keys */

export { stegConfig, ISteg };
