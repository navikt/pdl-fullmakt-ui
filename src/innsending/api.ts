import axios from 'axios';
import * as moment from 'moment-timezone';
import Environment from '../Environment';

function sendInnSoknad(soknad: object) {
    return axios
        .post(`${Environment().apiUrl}/sendinn`, soknad, {
            withCredentials: true,
        })
        .then(response => {
            return moment(response.data.innsendtDato);
        });
}

export { sendInnSoknad };
