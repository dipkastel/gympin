import axios from "axios";
import {PlaceOptionApi} from "./const_api";

export function placeOption_add(data) {
  return axios.post(PlaceOptionApi.add, data);
}
export function placeOption_delete(data) {
  return axios.put(PlaceOptionApi.delete,  data );
}
export function placeOption_getAll() {
  return axios.get(PlaceOptionApi.getAll);
}

export function placeOption_query(data) {
  return axios.post(PlaceOptionApi.query, data);
}

export function placeOption_update(data) {
  return axios.put(PlaceOptionApi.update, data);
}
