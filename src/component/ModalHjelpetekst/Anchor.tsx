import Ikon from 'nav-frontend-ikoner-assets';
import * as React from 'react';

export interface IAnchorProps {
    className?: string;
    hover?: boolean;
}

const Anchor: React.StatelessComponent<IAnchorProps> = ({ className, hover }) => (
    <Ikon kind={hover ? 'help-circle_hover' : 'help-circle'} className={className} />
);

export default Anchor;
