import axios from "axios";
import {PlaceCommentsApi} from "./const_api";

export function placeComments_add(data) {
    return axios.post(PlaceCommentsApi.add, data);
}

export function placeComments_delete(data) {
    return axios.put(PlaceCommentsApi.delete, data);
}

export function placeComments_getAll() {
    return axios.get(PlaceCommentsApi.getAll);
}

export function placeComments_update(data) {
    return axios.put(PlaceCommentsApi.update, data);
}

export function placeComments_query(data) {
  return axios.post(PlaceCommentsApi.query, data);
}
