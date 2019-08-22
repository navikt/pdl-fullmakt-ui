import axios from 'axios';
import Environment from '../Environment';

function fetchLand() {
    return axios.get(`${Environment().apiUrl}/land`).then(response => {
        return response.data;
    });
}

export { fetchLand };
