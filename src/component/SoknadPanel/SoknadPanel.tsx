import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';

interface ISoknadPanelProps {
    children: React.ReactNode;
    className?: string;
}

const SoknadPanel: React.StatelessComponent<ISoknadPanelProps> = ({ children, className = '' }) => {
    return <PanelBase className={'soknad-panel ' + className}>{children}</PanelBase>;
};

export default SoknadPanel;
