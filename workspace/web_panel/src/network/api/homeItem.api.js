import axios from "axios";
import {homeItem} from "./const_api";

//collection
export function _add(data) {
  return axios.post(homeItem.add, data);
}
export function _delete(data) {
  return axios.put(homeItem.delete, data );
}
export function _getAll() {
  return axios.get(homeItem.getAll);
}
export function _getById(data) {
  return axios.get(homeItem.getById, { params: data });
}
export function _getMainPage(data) {
  return axios.get(homeItem.getMainPage, { params: data });
}
export function _update(data) {
  return axios.put(homeItem.update, data);
}
