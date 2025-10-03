import axios from "axios";
import {linkApi} from "./const_api";

//gift
export function Link_add(data) {
    return axios.post(linkApi.add, data);
}
export function Link_query(data) {
    return axios.post(linkApi.query, data);
}
export function Link_update(data) {
    return axios.put(linkApi.update, data);
}
export function Link_delete(data) {
    return axios.put(linkApi.delete,  data );
}
export function Link_getById(data) {
    return axios.get(linkApi.getById,{ params: data });
}
