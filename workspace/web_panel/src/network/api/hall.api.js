import axios from "axios";
import {HallsApi} from "./const_api";

export function halls_add(data) {
  return axios.post(HallsApi.add, data);
}
export function halls_delete(data) {
  return axios.put(HallsApi.delete,  data );
}
export function halls_getAll() {
  return axios.get(HallsApi.getAll);
}
export function halls_update(data) {
  return axios.put(HallsApi.update, data);
}
export function halls_getById(data) {
  return axios.get(HallsApi.getById,{ params: data });
}

export function halls_getByPlaceId(data) {
  return axios.get(HallsApi.getByPlaceId,{ params: data });
}
