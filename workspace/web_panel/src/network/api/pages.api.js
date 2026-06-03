import axios from "axios";
import {pages} from "./const_api";

export function pages_add(item) {
    return axios.post(pages.add, item);
}
export function pages_delete(item) {
    return axios.put(pages.delete, item );
}
export function pages_getAll() {
    return axios.get(pages.getAll);
}
export function pages_query(data) {
    return axios.post(pages.query,data);
}

export function pages_getHome(pageId) {
    return axios.get(pages.getHome,{ params: pageId });
}
export function pages_clearCash() {
    return axios.get(pages.clearCash);
}
export function pages_getById(item) {
    return axios.get(pages.getById, { params: item });
}
export function pages_update(item) {
    return axios.put(pages.update, item);
}

export function pages_updatePriority(item) {
    return axios.put(pages.updatePriority, item);
}

//type
export function pages_getAllTypes() {
    return axios.get(pages.getAllTypes);
}
export function pages_addType(item) {
    return axios.post(pages.addType, item);
}
export function pages_deleteType(item) {
    return axios.put(pages.deleteType,  item );
}

export function pages_updateType(item) {
    return axios.put(pages.updateType,  item );
}
