import * as React from 'react';
interface IAdvarselIkon {
    style: {};
    className?: string;
}
const AdvarselIkon: React.StatelessComponent<IAdvarselIkon> = ({ style, className }) => {
    return (
        <svg
            className={className}
            style={style}
            enableBackground="new 0 0 60 60"
            width={24}
            height={24}
            version="1.1"
            viewBox="0 0 60 60"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Advarsel</title>
            <path
                className="st0"
                fill={'#FFB249'}
                d="M30.5,0L30,0c-8,0.1-15.6,3.4-21.3,9.1C2.9,14.9-0.1,22.5,0,30.5C0.3,47.1,13.2,60,29.5,60l0.5,0  c16.8-0.3,30.3-14,30-30.5C59.7,12.9,46.8,0,30.5,0z"
            />
            <path
                className="st1"
                fill={'#3E3832'}
                d="m30 13.6c1.5 0 2.7 1.2 2.7 2.7v15.7c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7v-15.6c0-1.5 1.2-2.8 2.7-2.8z"
            />
            <path
                className="st1"
                d="m30.1 48.4c-0.1 0-0.1 0 0 0-2.3 0-4.1-1.8-4.2-4 0-2.3 1.8-4.1 4-4.2h0.1c2.2 0 4 1.8 4.1 4 0 2.3-1.8 4.2-4 4.2z"
            />
        </svg>
    );
};

export default AdvarselIkon;
