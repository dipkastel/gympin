import axios from "axios";
import {PlaceApi, SportApi} from "./const_api";

//place
export function PlaceGym_getAllPlaces() {
    return axios.get(PlaceApi.getAllPlace);
}

export function PlaceGym_getPlaceById(place) {
    return axios.get(PlaceApi.getPlaceById, {params: place});
}

export function PlaceGym_getPlacesInviteCode(place) {
    return axios.get(PlaceApi.getPlacesInviteCode, {params: place});
}

export function PlaceGym_getPlaceByUser(place) {
    return axios.get(PlaceApi.getByUser, {params: place});
}

export function PlaceGym_addPlace(place) {
    return axios.post(PlaceApi.addPlace, place);
}

export  function placeGym_changeStatus(place){
    return axios.put(PlaceApi.CHANGE_STATUS,place)
}


export function PlaceGym_deletePlace(place) {
    return axios.put(PlaceApi.deletePlace,  place);
}

export function PlaceGym_updatePlace(place) {
    return axios.put(PlaceApi.updatePlace, place);
}


export function PlaceGym_updateOrder(place) {
    return axios.post(PlaceApi.updateOrder, place);
}

export function PlaceGym_GetCount(data) {
    return axios.get(PlaceApi.countFilter, data);
}

export function PlaceGym_query(data) {
    return axios.post(PlaceApi.query, data);
}

export function PlaceGym_GetMultimedias(data) {
    return axios.get(PlaceApi.getMultimedias, {params:data});
}
export function placeGym_getBuyableByPlace(data) {
    return axios.get(PlaceApi.getBuyableByPlace, {params:data});
}
export function PlaceGym_addMultimeida(data) {
    return axios.post(PlaceApi.addMultimedia, data);
}

export function PlaceGym_addMultimeidaList(data) {
    return axios.post(PlaceApi.addMultimediaList, data);
}

export function PlaceGym_deleteMultimedia(data) {
    return axios.put(PlaceApi.deleteMultimedia,data );
}
