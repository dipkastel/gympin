import axios from "axios";
import { UserApi } from "./const_api";
//user
export function user_add(data) {
  return axios.post(UserApi.add, data);
}
export function user_delete(data) {
  return axios.delete(UserApi.delete, { data: data });
}
export function user_getAll(_page, _size) {
  return axios.get(UserApi.getAll, { params: { page: _page, size: _size } });
}
export function user_getById(data) {
  return axios.get(UserApi.getById, { params: data });
}
export function user_update(data) {
  return axios.put(UserApi.update, data);
}
