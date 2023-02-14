import axios from "axios";
import {GatesApi} from "./const_api";

export function gates_add(data) {
  return axios.post(GatesApi.add, data);
}
export function gates_delete(data) {
  return axios.put(GatesApi.delete, null,{ params: data });
}
export function gates_getAll() {
  return axios.get(GatesApi.getAll);
}
export function gates_update(data) {
  return axios.put(GatesApi.update, data);
}
export function gates_getById(data) {
  return axios.get(GatesApi.getById,{ params: data });
}

export function gates_getByPlaceId(data) {
  return axios.get(GatesApi.getByPlaceId,{ params: data });
}
