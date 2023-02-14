import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function getAllRegions() {
    return axios.get(Api_url.region.GET_ALL);
}
export function getAllByCity(cityId) {
    return axios.get(Api_url.region.GET_BY_CITY,{params:{id:cityId}});
}
