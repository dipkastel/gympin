import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function placeAbout_getByPlace(data) {
  return axios.get(Api_url.placeAbout.GET_BY_PLACE_ID,{params:data});
}
