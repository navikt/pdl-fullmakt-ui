declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    interface IIkonProps {
        height?: string | number;
        width?: string | number;
        kind: string;
        onClick?: () => void;
        preview?: boolean;
        size?: string | number;
        style?: object;
        wrapperStyle?: object;
        className?: string;
    }

    export default class Ikon extends React.Component<IIkonProps, {}> {}
}
