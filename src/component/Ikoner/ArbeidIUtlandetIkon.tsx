import * as React from 'react';

const ArbeidIUtlandetIkon: React.StatelessComponent<{}> = () => {
    return (
        <svg
            version="1.1"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>Arbeider i utlandet Ikon</title>
            <defs>
                <circle id="a" cx="32" cy="32" r="32" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="white">
                    <use xlinkHref="#a" />
                </mask>
                <g fill="#C1B5D0" mask="url(#b)">
                    <polygon points="0 64 64 64 64 0 0 0" />
                </g>
                <g transform="translate(11 16)">
                    <path
                        d="m1.7173 32c-0.39596 0-0.71732-0.32339-0.71732-0.72185v-16.556c0-0.39846 0.32136-0.72185 0.71732-0.72185h38.565c0.39668 0 0.71732 0.32339 0.71732 0.72185v16.556c0 0.39846-0.32064 0.72185-0.71732 0.72185h-38.565z"
                        fill="#3E3832"
                    />
                    <polygon points="1 20 41 20 41 16 1 16" fill="#333" />
                    <path
                        d="m27 4h-1.4942v-1.1519c0-0.63817-0.45648-1.1553-1.0198-1.1553h-6.9727c-0.56332 0-1.0198 0.51714-1.0198 1.1553v1.1519h-1.4935v-1.3153c0-1.4829 1.0601-2.6847 2.3683-2.6847h7.2619c1.3089 0 2.3698 1.2019 2.3698 2.6847v1.3153z"
                        fill="#3E3832"
                    />
                    <path
                        d="m41.305 20c0.38362 0 0.69496-0.32793 0.69496-0.732v-14.536c0-0.40406-0.31134-0.732-0.69496-0.732h-40.61c-0.38292 0-0.69496 0.32793-0.69496 0.732v14.536c0 0.40406 0.31204 0.732 0.69496 0.732h40.61z"
                        fill="#5C4378"
                    />
                    <path
                        d="m23.513 18h-5.0251c-0.82135 0-1.4874 0.60643-1.4874 1.3542v1.2916c0 0.74779 0.66608 1.3542 1.4874 1.3542h5.0251c0.82135 0 1.4874-0.60643 1.4874-1.3542v-1.2916c0-0.74779-0.66608-1.3542-1.4874-1.3542"
                        fill="#fff"
                    />
                </g>
            </g>
        </svg>
    );
};

export default ArbeidIUtlandetIkon;
