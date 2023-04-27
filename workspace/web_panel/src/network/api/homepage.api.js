import axios from "axios";
import {CorporateApi, homepage} from "./const_api";

export function homepage_add(item) {
    return axios.post(homepage.add, item);
}
export function homepage_delete(item) {
    return axios.put(homepage.delete, null,{ params: item });
}
export function homepage_getAll() {
    return axios.get(homepage.getAll);
}
export function homepage_query(data) {
    return axios.post(homepage.query,data);
}

export function homepage_getHome(item) {
    return axios.get(homepage.getHome,{ params: item });
}
export function homepage_getById(item) {
    return axios.get(homepage.getById, { params: item });
}
export function homepage_update(item) {
    return axios.put(homepage.update, item);
}

//type
export function homepage_getAllTypes() {
    return axios.get(homepage.getAllTypes);
}
export function homepage_addType(item) {
    return axios.post(homepage.addType, item);
}
export function homepage_deleteType(item) {
    return axios.put(homepage.deleteType, null,{ params: item });
}

//Destinations
export function homepage_getAllDestinations() {
    return axios.get(homepage.getAllDestinations);
}
export function homepage_addDestinations(item) {
    return axios.post(homepage.addDestinations, item);
}
export function homepage_deleteDestinations(item) {
    return axios.put(homepage.deleteDestinations, null,{ params: item });
}
