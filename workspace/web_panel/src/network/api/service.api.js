import axios from "axios";
import {ServiceApi} from "./const_api";

export function service_query(data) {
    return axios.post(ServiceApi.query, data);
}


export function service_GetActiveUsers(data) {
    return axios.post(ServiceApi.getUsersActive, data);
}
