import axios from "axios";
import {get} from "../store";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getClient = async () => {
    const token = await get('token');
    if (token) {
        // TODO: If I add this token to Authorization header, I always get 401 Unauthorized from Strapi.
        client.defaults.headers.common['token'] = token;
    }

    return client;
}

export {
    getClient
};