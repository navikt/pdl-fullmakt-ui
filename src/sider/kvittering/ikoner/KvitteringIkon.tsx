import * as React from 'react';

interface IKvitteringIkon {
    className: string;
}

const KvitteringIkon: React.StatelessComponent<IKvitteringIkon> = props => (
    <svg
        version="1.1"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={props.className}
    >
        <title>Group</title>
        <desc>Created with Sketch.</desc>
        <defs>
            <circle id="c" cx="32" cy="32" r="32" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <g transform="translate(-128 -201)">
                <g transform="translate(128 201)">
                    <mask id="d" fill="white">
                        <use xlinkHref="#c" />
                    </mask>
                    <g fill="#9BD0B0" mask="url(#d)">
                        <polygon points="0 64 64 64 64 0 0 0" />
                    </g>
                    <g transform="translate(14 12)">
                        <path
                            d="m2.7924 19.266c-0.44068-0.44108-2.5262-1.9553-2.0849-2.3963l-0.7075-2.2366 16.702-14.302c0.44131-0.44108 1.1558-0.44108 1.5978 0l16.7 14.302-3.7827 8.1832c0.44004 0.44044-13.832 7.7421-14.272 8.1838l-14.153-11.734z"
                            fill="#0C576F"
                        />
                        <path
                            d="m3.3525 30c-0.19512 0-0.3525-0.16101-0.3525-0.35565v-19.288c0-0.19658 0.15738-0.3563 0.3525-0.3563h28.296c0.19385 0 0.35122 0.15972 0.35122 0.3563v19.288c0 0.19464-0.15738 0.35565-0.35122 0.35565h-28.296z"
                            fill="#DCDCD2"
                        />
                        <path
                            d="m29.987 38c0.73466 0-29.987-23-29.987-23v21.697c0 0.71895 0.59503 1.3029 1.329 1.3029h28.658z"
                            fill="#E7E9E9"
                        />
                        <path
                            d="m34.715 38h-27.703c-0.70955 0 28.987-23 28.987-23v21.697c0 0.71895-0.57519 1.3029-1.2847 1.3029"
                            fill="#fff"
                        />
                    </g>
                    <g transform="translate(18 20)">
                        <rect x="8" y="35" width="12" height="1" fill="#C6C2BF" />
                        <g transform="translate(7.28 3.36)">
                            <path
                                d="m6.72 0c-3.7055 0-6.72 3.015-6.72 6.72s3.0145 6.72 6.72 6.72c3.705 0 6.72-3.015 6.72-6.72s-3.015-6.72-6.72-6.72z"
                                fill="#06893A"
                                fillRule="nonzero"
                            />
                            <path
                                d="m9.711 4.965l-4.2 3.92c-0.05376 0.04984-0.12264 0.07504-0.19096 0.07504-0.07224 0-0.14336-0.02744-0.19824-0.08176l-1.4-1.4c-0.1092-0.1092-0.1092-0.28672 0-0.39592s0.28672-0.1092 0.39592 0l1.2085 1.2085 4.0023-3.7352c0.11256-0.10528 0.29008-0.10024 0.39592 0.01288s0.09968 0.29064-0.01344 0.39648z"
                                stroke="#fff"
                                strokeWidth="2"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export default KvitteringIkon;
