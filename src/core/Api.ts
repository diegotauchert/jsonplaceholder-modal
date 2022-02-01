import axios from 'axios';
import format from "../helpers/formatApiResponse";

const URL = process.env.REACT_APP_BACKEND_URL;

const connect = axios.create({
    baseURL: URL
});

connect.interceptors.response.use(function (response) {
    return response
}, error => {
    return format({status: error.response.status}, error.response.data)
})

connect.interceptors.request.use(function (request) {
    return request
}, error => {
    return format({status: error.request.status}, error.request.data)
})

export {connect}
