import axios from "axios";
import { collection } from "./const_api";

//collection
export function _add(sport) {
  return axios.post(collection.add, sport);
}
export function _delete(sport) {
  return axios.put(collection.delete, { params: sport });
}
export function _getAll() {
  return axios.get(collection.getAll);
}
export function _getById(sport) {
  return axios.get(collection.getById, { params: sport });
}
export function _getMainPage(sport) {
  return axios.get(collection.getMainPage, { params: sport });
}
export function _update(sport) {
  return axios.put(collection.update, sport);
}
