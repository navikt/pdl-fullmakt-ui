import * as React from 'react';

const Filikon: React.StatelessComponent<{}> = () => {
    return (
        <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <title>FilIkon</title>
            <g fill="none" fillRule="evenodd">
                <mask id="a" fill="white">
                    <circle cx="50" cy="50" r="50" />
                </mask>
                <g fill="#A190B8" mask="url(#a)">
                    <polygon points="0 100 100 100 100 0 0 0" />
                </g>
                <g transform="translate(27 19)">
                    <g>
                        <path
                            d="m-1.1369e-13 10.158v47.76c0 1.7024 1.338 3.0826 2.9892 3.0826h40.023c1.6495 0 2.9875-1.3802 2.9875-3.0826v-54.835c0-1.7024-1.338-3.0826-2.9875-3.0826h-32.61l-10.403 10.158z"
                            fill="#E4E4DB"
                            xmlns="http://www.w3.org/2000/svg"
                        />
                    </g>
                    <path
                        d="m10.497 0v7.0795c0 1.7045-1.3502 3.0857-3.0164 3.0857h-7.481l10.497-10.165z"
                        fill="#C9C9C9"
                    />
                    <g transform="translate(1.7037 8.7143)" fill="#8F9395">
                        <g transform="translate(6.88 6.16)">
                            <polygon points="0 8.7454 29.066 8.7454 29.066 6.16 0 6.16" />
                            <polygon points="0 14.026 29.066 14.026 29.066 11.44 0 11.44" />
                            <polygon points="0 20.185 28.96 20.185 28.96 17.6 0 17.6" />
                            <polygon points="0 25.465 28.96 25.465 28.96 22.88 0 22.88" />
                            <polygon points="0 31.625 28.96 31.625 28.96 29.04 0 29.04" />
                            <polygon points="0 2.5854 29.066 2.5854 29.066 0 0 0" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Filikon;
