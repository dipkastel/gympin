import axios from "axios";
import {AdministratorApi} from "./const_api";

//user
export function administrator_add(user) {
  return axios.post(AdministratorApi.add, user);
}
export function administrator_delete(user) {
  return axios.delete(AdministratorApi.delete, { data: user });
}
export function administrator_getAll() {
  return axios.get(AdministratorApi.getAll);
}
export function administrator_getById(user) {
  return axios.get(AdministratorApi.getById, { params: { id: user } });
}
export function administrator_update(user) {
  return axios.put(AdministratorApi.update, user);
}
