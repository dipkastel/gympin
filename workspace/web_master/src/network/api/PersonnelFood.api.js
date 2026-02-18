import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function PersonnelFood_add(data) {
  return axios.post(Api_url.personnelFood.add, data);
}

export function PersonnelFood_delete(data) {
  return axios.put(Api_url.personnelFood.delete, data);
}
export function PersonnelFood_query(data) {
  return axios.post(Api_url.personnelFood.query, data);
}
