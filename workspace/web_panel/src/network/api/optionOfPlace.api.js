import axios from "axios";
import {optionOfPlaceApi, PlaceOptionApi, PlaceSportApi, SportApi} from "./const_api";

export function optionOfPlace_add(data) {
  return axios.post(optionOfPlaceApi.add, data);
}
export function optionOfPlace_delete(data) {
  return axios.put(optionOfPlaceApi.delete, null,{ params: data });
}
export function optionOfPlace_getAll() {
  return axios.get(optionOfPlaceApi.getAll);
}
export function optionOfPlace_update(data) {
  return axios.put(optionOfPlaceApi.update, data);
}
export function optionOfPlace_getByPlaceId(data) {
  return axios.get(optionOfPlaceApi.getByPlaceId,{ params: data });
}
