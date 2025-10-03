import axios from "axios";
import {GymApi} from "./const_api";

//place
export function PlaceGym_getPlaceById(place) {
    return axios.get(GymApi.getPlaceById, {params: place});
}

export function PlaceGym_getPlacesInviteCode(place) {
    return axios.get(GymApi.getPlacesInviteCode, {params: place});
}


export function PlaceGym_addPlace(place) {
    return axios.post(GymApi.addPlace, place);
}

export  function placeGym_changeStatus(place){
    return axios.put(GymApi.CHANGE_STATUS,place)
}


export function PlaceGym_deletePlace(place) {
    return axios.put(GymApi.deletePlace,  place);
}

export function PlaceGym_updatePlace(place) {
    return axios.put(GymApi.updatePlace, place);
}


export function PlaceGym_updateOrder(place) {
    return axios.post(GymApi.updateOrder, place);
}

export function PlaceGym_query(data) {
    return axios.post(GymApi.query, data);
}

export function PlaceGym_GetMultimedias(data) {
    return axios.get(GymApi.getMultimedias, {params:data});
}
export function placeGym_getBuyableByPlace(data) {
    return axios.get(GymApi.getBuyableByPlace, {params:data});
}
export function PlaceGym_addMultimeida(data) {
    return axios.post(GymApi.addMultimedia, data);
}

export function PlaceGym_addMultimeidaList(data) {
    return axios.post(GymApi.addMultimediaList, data);
}

export function PlaceGym_setDefaultMultimedia(data) {
    return axios.post(GymApi.setDefaultMultimedia, data);
}

export function PlaceGym_deleteMultimedia(data) {
    return axios.put(GymApi.deleteMultimedia,data );
}
