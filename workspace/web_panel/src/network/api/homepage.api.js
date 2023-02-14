import axios from "axios";
import {homepage} from "./const_api";

export function homepage_add(item) {
    return axios.post(homepage.add, item);
}
export function homepage_delete(item) {
    return axios.put(homepage.delete, null,{ params: item });
}
export function homepage_getAll() {
    return axios.get(homepage.getAll);
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
