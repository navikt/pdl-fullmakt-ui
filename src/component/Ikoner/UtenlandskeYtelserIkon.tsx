import * as React from 'react';

const utenlandskeYtelserIkon: React.StatelessComponent<{}> = () => {
    return (
        <svg
            version="1.1"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>Utenlandsk ytelser ikon</title>
            <defs>
                <circle id="a" cx="32" cy="32" r="32" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="utenlands-ytelser-ikon-id" fill="white">
                    <use xlinkHref="#a" />
                </mask>
                <g fill="#C1B5D0" mask="url(#utenlands-ytelser-ikon-id)">
                    <polygon points="0 64 64 64 64 0 0 0" />
                </g>
                <g transform="translate(10 10)" fill="#634689" fillRule="nonzero">
                    <circle cx="22" cy="22" r="22" />
                </g>
                <g transform="translate(11 10)" fillRule="nonzero" stroke="#C1B5D0">
                    <ellipse cx="21" cy="22" rx="15" ry="22" />
                    <ellipse cx="21.5" cy="22" rx="5.5" ry="22" />
                    <path
                        d="m2.5 11.5c4.6074 2.3333 10.774 3.5 18.5 3.5s13.726-1.1667 18-3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="m2.5 33.25c5.127-2.2852 11.294-3.4277 18.5-3.4277s13.206 1.1426 18 3.4277"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="m0 22.208h42"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </g>
        </svg>
    );
};

export default utenlandskeYtelserIkon;
