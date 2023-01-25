import axios from "axios";

export const API_URL = 'https://intensiv.ru/api/tests-list/';

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: false,
    method: 'get',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },

})



