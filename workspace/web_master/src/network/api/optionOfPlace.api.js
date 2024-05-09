import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function optionOfPlace_add(data) {
  return axios.post(Api_url.optionOfPlace.ADD, data);
}
export function optionOfPlace_delete(data) {
  return axios.put(Api_url.optionOfPlace.DELETE,  data );
}
export function optionOfPlace_getByPlaceId(data) {
  return axios.get(Api_url.optionOfPlace.GET_BY_PLACE_ID,{ params: data });
}
