import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function getAllPlaces() {
    return axios.get(Api_url.place.GET_ALL);
}

export function getPlace(id) {
    return axios.get(Api_url.place.GET_BY_ID,{params:{id:id}});
}
