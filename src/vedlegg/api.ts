import axios from 'axios';
import Environment from '../Environment';

interface ILastOppVedleggRespons {
    vedleggsId: string;
    filnavn: string;
}

function lastOppVedlegg(fil: File) {
    const formData = new FormData();
    formData.append('file', fil);

    return axios
        .post(`${Environment().apiUrl}/vedlegg/`, formData, {
            withCredentials: true,
        })
        .then(
            (response): ILastOppVedleggRespons => {
                return response.data;
            }
        );
}

export { lastOppVedlegg, ILastOppVedleggRespons };
