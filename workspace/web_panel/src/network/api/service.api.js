import axios from "axios";
import {ServiceApi} from "./const_api";

export function service_query(data) {
    return axios.post(ServiceApi.query, data);
}

export function service_deleteCorruptedItems(data) {
    return axios.post(ServiceApi.deleteCorruptedItems, data);
}
