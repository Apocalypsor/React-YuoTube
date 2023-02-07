import axios from "axios";
import {get} from "../store";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getClient = async () => {
    const token = get('token');
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return client;
}

export {
    getClient
};