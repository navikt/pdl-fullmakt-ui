import * as React from 'react';

interface IBindersIkon {
    className?: string;
    style?: {};
}

const BindersIkon: React.FunctionComponent<IBindersIkon> = ({ className, style }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            style={style}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M7.717 15.202l8.501-8.5a2 2 0 1 1 2.828 2.828L7.563 21.048a4 4 0 0 1-5.657-5.657l12-12a5.498 5.498 0 0 1 7.778 0 5.497 5.497 0 0 1 0 7.776l-8.5 8.5"
                fill="none"
            />
        </svg>
    );
};

export default BindersIkon;
