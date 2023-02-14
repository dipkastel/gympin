import axios from "axios";
import {PlaceAboutApi, PlaceOptionApi, PlaceSportApi, SportApi} from "./const_api";

export function placeAbout_add(data) {
  return axios.post(PlaceAboutApi.add, data);
}
export function placeAbout_delete(data) {
  return axios.put(PlaceAboutApi.delete, null,{ params: data });
}
export function placeAbout_getAll() {
  return axios.get(PlaceAboutApi.getAll);
}
export function placeAbout_getByPlace(data) {
  return axios.get(PlaceAboutApi.getByPlace,{params:data});
}
export function placeAbout_update(data) {
  return axios.put(PlaceAboutApi.update, data);
}
