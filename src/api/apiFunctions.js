import axios from 'axios';

/* const ACCESS_TOKEN = ''; */
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
console.log(ACCESS_TOKEN);

export const fetchData = (url, params={}) =>{

    const config = {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "x-api-key": ACCESS_TOKEN
        },
        params

    }

    return axios.get(url, config);
};