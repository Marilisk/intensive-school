import axios from "axios";

export const API_URL = 'https://intensiv.ru/tests-list/';

export const instance = axios.create({
    baseURL: API_URL,
    /* crossdomain: true, */
    withCredentials: false,
    method: 'get',
    headers: {
        //'Content-Type': 'application/json; charset=utf-8',
        'Content-Type': 'application/json'
    },

})