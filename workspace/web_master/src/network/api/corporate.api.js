import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";


export function place_getMyPlaceById(params) {
  return axios.get(Api_url.place.getMyPlaceById, { params: { id: params } });
}
