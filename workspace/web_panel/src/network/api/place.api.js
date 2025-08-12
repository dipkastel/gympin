import axios from "axios";
import {PlaceApi} from "./const_api";

//place
export function Place_getPlacesInviteCode(place) {
    return axios.get(PlaceApi.getPlacesInviteCode, {params: place});
}

export function Place_getPlaceByUser(place) {
    return axios.get(PlaceApi.getByUser, {params: place});
}

export function Place_query(data) {
    return axios.post(PlaceApi.query, data);
}

export function place_getBuyableByPlace(data) {
    return axios.get(PlaceApi.getBuyableByPlace, {params:data});
}
