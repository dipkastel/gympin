import axios from "axios";
import {PlacePersonelApi} from "./const_api";

export function placePersonnel_add(data) {
  return axios.post(PlacePersonelApi.add, data);
}
export function placePersonnel_delete(data) {
  return axios.put(PlacePersonelApi.delete, null,{ params: data });
}
export function placePersonnel_getAll() {
  return axios.get(PlacePersonelApi.getAll);
}
export function placePersonnel_update(data) {
  return axios.put(PlacePersonelApi.update, data);
}
export function placePersonnel_ByPlace(data) {
  return axios.get(PlacePersonelApi.PersonnelByPlace,{params: data});
}
