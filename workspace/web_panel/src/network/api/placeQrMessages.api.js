import axios from "axios";
import {PlaceQrMessageApi} from "./const_api";

export function placeQrMessages_add(data) {
  return axios.post(PlaceQrMessageApi.add, data);
}
export function placeQrMessages_delete(data) {
  return axios.put(PlaceQrMessageApi.delete, null,{ params: data });
}
export function placeQrMessages_getAll() {
  return axios.get(PlaceQrMessageApi.getAll);
}
export function placeQrMessages_getByPlace(data) {
  return axios.get(PlaceQrMessageApi.getByPlace,{params:data});
}
export function placeQrMessages_update(data) {
  return axios.put(PlaceQrMessageApi.update, data);
}
