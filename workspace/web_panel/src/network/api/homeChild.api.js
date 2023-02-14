import axios from "axios";
import { homeChild } from "./const_api";

//collection
export function _add(data) {
  return axios.post(homeChild.add, data);
}
export function _delete(data) {
  return axios.put(homeChild.delete, data );
}
export function _getAll() {
  return axios.get(homeChild.getAll);
}
export function _getById(data) {
  return axios.get(homeChild.getById, { params: data });
}
export function _getMainPage(data) {
  return axios.get(homeChild.getMainPage, { params: data });
}
export function _update(data) {
  return axios.put(homeChild.update, data);
}
