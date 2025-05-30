import axios from "axios";
import {CateringApi, PlaceApi, SportApi} from "./const_api";

//catering
export function Catering_getAll() {
    return axios.get(CateringApi.getAll);
}

export function Catering_getById(place) {
    return axios.get(CateringApi.getById, {params: place});
}

export function Catering_add(place) {
    return axios.post(CateringApi.add, place);
}

export function Catering_delete(place) {
    return axios.put(CateringApi.delete,  place);
}

export function Catering_update(place) {
    return axios.put(CateringApi.update, place);
}

export function Catering_query(data) {
    return axios.post(CateringApi.query, data);
}
