import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

//catering
export function Catering_getAll() {
    return axios.get(Api_url.catering.getAll);
}

export function Catering_getById(place) {
    return axios.get(Api_url.catering.getById, {params: place});
}

export function Catering_add(place) {
    return axios.post(Api_url.catering.add, place);
}

export function Catering_delete(place) {
    return axios.put(Api_url.catering.delete, place);
}

export function Catering_update(place) {
    return axios.put(Api_url.catering.update, place);
}

export function Catering_query(data) {
    return axios.post(Api_url.catering.query, data);
}
