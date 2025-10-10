import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

//catering
export function Catering_getAll() {
    return axios.get(Api_url.catering.getAll);
}

export function Catering_getById(place) {
    return axios.get(Api_url.catering.getById, {params: place});
}
