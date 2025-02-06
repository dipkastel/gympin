import axios from "axios";
import {TagApi} from "./const_api";

export function tag_add(data) {
    return axios.post(TagApi.add, data);
}
export function tag_delete(data) {
    return axios.put(TagApi.delete,  data );
}
export function tag_getAll() {
    return axios.get(TagApi.getAll);
}
export function tag_getById(data) {
    return axios.get(TagApi.getById,{ params: data });
}
export function tag_update(data) {
    return axios.put(TagApi.update, data);
}
export function tag_query(data) {
    return axios.post(TagApi.query, data);
}

export function tag_addToPlace(data) {
    return axios.post(TagApi.addToPlace, data);
}

export function tag_removeFromPlace(data) {
    return axios.post(TagApi.removeFromPlace, data);
}

export function tag_getPlaceTags(data) {
    return axios.get(TagApi.getPlaceTags,{ params: data });
}
