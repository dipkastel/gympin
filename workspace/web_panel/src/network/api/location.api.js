import axios from "axios";
import { LocationApi} from "./const_api";

export function Location_getAll() {
    return axios.get(LocationApi.getAll);
}

export function Location_add(data) {
    return axios.post(LocationApi.add, data);
}

export function Location_query(data) {
    return axios.post(LocationApi.query, data);
}

export function Location_getById(param) {
    return axios.get(LocationApi.getById,{params:param});
}

export function Location_delete(data) {
    return axios.put(LocationApi.delete, data);
}

export function Location_update(data) {
    return axios.put(LocationApi.update, data);
}


