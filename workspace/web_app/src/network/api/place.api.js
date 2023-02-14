import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function place_getAll() {
    return axios.get(Api_url.place.GET_ALL);
}

export function place_getById(id) {
    return axios.get(Api_url.place.GET_BY_ID,{params:{id:id}});
}
