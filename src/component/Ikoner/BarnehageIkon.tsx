import * as React from 'react';

const Barnehageikon: React.StatelessComponent<{}> = () => {
    return (
        <svg version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <title>Barnehage Ikon</title>
            <g fill="none" fillRule="evenodd" strokeWidth="1">
                <mask id="b" fill="white">
                    <circle cx="32" cy="32" r="32" />
                </mask>
                <g fill="#C1B5D0" mask="url(#b)">
                    <polygon points="0 64 64 64 64 0 0 0" />
                </g>
                <mask id="a" fill="white">
                    <circle cx="32" cy="32" r="32" />
                </mask>
                <g mask="url(#a)">
                    <g transform="translate(8 14)">
                        <path
                            d="m43.2 40.854h-4.1354v-35.366h-30.065v35.366h-4.2v-34.756c0-2.6941 2.116-4.878 4.7262-4.878h28.948c2.6102 0 4.7262 2.184 4.7262 4.878v34.756z"
                            fill="#3E3832"
                        />
                        <rect x="15" width="2.4" height="29.268" rx="1.2" fill="#fff" />
                        <rect x="30.6" width="2.4" height="29.268" rx="1.2" fill="#fff" />
                        <rect
                            x="12.6"
                            y="26.829"
                            width="22.8"
                            height="3.6585"
                            rx="1.8293"
                            fill="#5C4378"
                        />
                        <rect y="40.244" width="48" height="9.7561" fill="#38A161" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Barnehageikon;
