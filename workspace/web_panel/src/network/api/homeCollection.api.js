import axios from "axios";
import {homeCollection} from "./const_api";

//collection
export function _add(data) {
  return axios.post(homeCollection.add, data);
}
export function _delete(data) {
  return axios.put(homeCollection.delete, data );
}
export function _getAll() {
  return axios.get(homeCollection.getAll);
}
export function _getById(data) {
  return axios.get(homeCollection.getById, { params: data });
}
export function _getMainPage(data) {
  return axios.get(homeCollection.getMainPage, { params: data });
}
export function _update(data) {
  return axios.put(homeCollection.update, data);
}
