import axios from "axios";
import {PlaceSportApi} from "./const_api";

//sport
export function placeSport_add(placeSport) {
  return axios.post(PlaceSportApi.add, placeSport);
}
export function placeSport_delete(placeSport) {
  return axios.put(PlaceSportApi.delete,  placeSport );
}
export function placeSport_getAll() {
  return axios.get(PlaceSportApi.getAll);
}
export function placeSport_update(placeSport) {
  return axios.put(PlaceSportApi.update, placeSport);
}

export function placeSport_getSportsByPlace(placeSport) {
  return axios.get(PlaceSportApi.getSportsByPlace, { params: placeSport });
}
