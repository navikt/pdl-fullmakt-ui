import axios from 'axios';
import Environment from '../Environment';

function pingBackend() {
    return axios.get(`${Environment().apiUrl}/status/ping`, {
        withCredentials: true,
    });
}

export { pingBackend };
