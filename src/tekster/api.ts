import axios from 'axios';
import Environment from '../Environment';

function fetchTekster() {
    return axios.get(`${Environment().apiUrl}/tekster`).then(response => {
        return response.data;
    });
}

export { fetchTekster };
