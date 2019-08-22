import * as React from 'react';

const BorSammenIkon: React.StatelessComponent<{}> = () => {
    return (
        <svg
            enableBackground="new 0 0 64 64"
            version="1.1"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="32" fill="#C1B5D0" />
            <path
                d="m20 27.7c0-6.5 5.4-11.7 12-11.7s12 5.2 12 11.7c0 1.7-0.4 3.4-1.1 4.9h0.1l-11 19.4-11-19.5h0.1c-0.7-1.4-1.1-3.1-1.1-4.8zm12 6.3c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z"
                fill="#5C4378"
            />
            <circle cx="32" cy="28" r="6" fill="#fff" />
        </svg>
    );
};

export default BorSammenIkon;
