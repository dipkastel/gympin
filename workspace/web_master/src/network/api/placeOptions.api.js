import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function placeOption_getAll(param) {
  return axios.get(Api_url.placeOption.GET_ALL,{params:param});
}
