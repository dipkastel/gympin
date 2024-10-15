import axios from "axios";
import {PlaceApi, SportApi} from "./const_api";

//place
export function Place_getAllPlaces() {
    return axios.get(PlaceApi.getAllPlace);
}

export function Place_getPlaceById(place) {
    return axios.get(PlaceApi.getPlaceById, {params: place});
}

export function Place_getPlacesInviteCode(place) {
    return axios.get(PlaceApi.getPlacesInviteCode, {params: place});
}

export function Place_getPlaceByUser(place) {
    return axios.get(PlaceApi.getByUser, {params: place});
}

export function Place_addPlace(place) {
    return axios.post(PlaceApi.addPlace, place);
}

export  function place_changeStatus(place){
    return axios.put(PlaceApi.CHANGE_STATUS,place)
}


export function Place_deletePlace(place) {
    return axios.put(PlaceApi.deletePlace,  place);
}

export function Place_updatePlace(place) {
    return axios.put(PlaceApi.updatePlace, place);
}


export function Place_updateOrder(place) {
    return axios.post(PlaceApi.updateOrder, place);
}

export function Place_GetCount(data) {
    return axios.get(PlaceApi.countFilter, data);
}

export function Place_query(data) {
    return axios.post(PlaceApi.query, data);
}

export function Place_GetMultimedias(data) {
    return axios.get(PlaceApi.getMultimedias, {params:data});
}
export function place_getBuyableByPlace(data) {
    return axios.get(PlaceApi.getBuyableByPlace, {params:data});
}
export function Place_addMultimeida(data) {
    return axios.post(PlaceApi.addMultimedia, data);
}

export function Place_addMultimeidaList(data) {
    return axios.post(PlaceApi.addMultimediaList, data);
}

export function Place_deleteMultimedia(data) {
    return axios.put(PlaceApi.deleteMultimedia,data );
}
