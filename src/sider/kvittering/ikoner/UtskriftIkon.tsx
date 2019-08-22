import * as React from 'react';

interface IUtskriftIkon {
    className: string;
}

const UtskriftIkon: React.StatelessComponent<IUtskriftIkon> = props => (
    <svg
        version="1.1"
        viewBox="0 0 24 23"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={props.className}
    >
        <title>LINE/hardware/ printer</title>
        <desc>Created with Sketch.</desc>
        <defs>
            <path
                id="a"
                d="m22.999 15.847c0 0.82688-0.67348 1.4989-1.4989 1.4989h-2.4996v-2.4996c0-0.27611-0.22644-0.49963-0.5011-0.49963h-13.001c-0.27465 0-0.49963 0.22352-0.49963 0.49963v2.4996h-2.4996c-0.82688 0-1.5004-0.67202-1.5004-1.4989v-6c0-0.82688 0.67348-1.5004 1.5004-1.5004h19.001c0.82542 0 1.4989 0.67348 1.4989 1.5004v6zm-16.999 6.4996h12v-7.0007h-12v7.0007zm15.5-14.999c1.3776 0 2.4996 1.122 2.4996 2.4996v6c0 1.3776-1.122 2.4996-2.4996 2.4996h-2.4996v4.4996c0 0.27611-0.22644 0.5011-0.5011 0.5011h-13.001c-0.27465 0-0.49963-0.22498-0.49963-0.5011v-4.4996h-2.4996c-1.3791 0-2.4996-1.122-2.4996-2.4996v-6c0-1.3776 1.1205-2.4996 2.4996-2.4996h19.001zm-15.153-5.3398v3.9109h-1.008v-4.4149c0-0.27904 0.22498-0.50402 0.50402-0.50402h13.043c0.27757 0 0.50256 0.22498 0.50256 0.50402v4.4149h-1.0066v-3.9109h-12.035z"
            />
        </defs>
        <g fill="none" fillRule="evenodd">
            <g transform="translate(-511 -750)">
                <g transform="translate(511 749)" fill="#3E3832" fillRule="evenodd">
                    <mask id="b" fill="white">
                        <use xlinkHref="#a" />
                    </mask>
                    <use xlinkHref="#a" />
                    <g mask="url(#b)">
                        <g transform="translate(12 12) scale(1 -1) translate(-12 -12)">
                            <rect width="24" height="24" />
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export default UtskriftIkon;
