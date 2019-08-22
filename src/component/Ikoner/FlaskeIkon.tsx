import * as React from 'react';

const FlaskeIkon: React.StatelessComponent<{}> = () => {
    return (
        <svg
            version="1.1"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="white">
                    <circle id="a" cx="32" cy="32" r="32" />
                </mask>
                <g fill="#C1B5D0" mask="url(#b)">
                    <polygon points="0 64 64 64 64 0 0 0" />
                </g>
                <g
                    transform="translate(34.517 31.517) rotate(45) translate(-11.5 -26)"
                    fillRule="nonzero"
                >
                    <g transform="translate(.70747 .70747)">
                        <path
                            d="m5.2015 11.739h10.94c1.1046 0 2 0.89543 2 2v2.2686h-14.94v-2.2686c0-1.1046 0.89543-2 2-2z"
                            fill="#634689"
                        />
                        <path
                            d="m4.5735 16.007h12.196v1.9797c0 1.8163 1.5245 4.4542 3.049 6.9288 1.5245 2.4746 1.5245 4.2696 1.5245 7.9186v15.342c0 1.0933-1.3651 1.9797-3.049 1.9797h-15.245c-1.6839 0-3.049-0.88632-3.049-1.9797v-15.342c0-3.649 0-5.4441 1.5245-7.9186 1.5245-2.4746 3.049-5.1125 3.049-6.9288v-1.9797z"
                            fill="#D8D8D8"
                        />
                        <path
                            d="m10.672 0c1.9592 0 2.988 1.8253 2.988 3.1726 0 1.2161-0.50283 2.2614-1.5085 3.1361 1.8594 1.8013 2.7891 3.3785 2.7891 4.7315v0.6985h-8.5373v-0.6985c0-1.3531 0.90683-2.9303 2.7205-4.7315-0.95993-0.87466-1.4399-1.92-1.4399-3.1361 0-1.3473 1.0288-3.1726 2.988-3.1726z"
                            fill="#F5E3E0"
                        />
                        <path
                            d="m1.0672 46.265l19.209-18.519v19.343c0 1.1046-0.89543 2-2 2h-15.209c-1.1046 0-2-0.89543-2-2v-0.82444z"
                            fill="#fff"
                        />
                    </g>
                    <path d="m3.7351 27.996h4.2686" stroke="#979797" strokeLinecap="square" />
                    <path d="m3.7351 34.399h4.2686" stroke="#979797" strokeLinecap="square" />
                    <path d="m3.7351 40.802h4.2686" stroke="#979797" strokeLinecap="square" />
                    <path d="m3.7351 47.205h4.2686" stroke="#979797" strokeLinecap="square" />
                </g>
            </g>
        </svg>
    );
};

export default FlaskeIkon;
