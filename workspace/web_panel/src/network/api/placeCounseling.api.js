import axios from "axios";
import {CounselingApi} from "./const_api";

//place
export function PlaceCounseling_getPlaceById(place) {
    return axios.get(CounselingApi.getPlaceById, {params: place});
}

export function PlaceCounseling_getPlacesInviteCode(place) {
    return axios.get(CounselingApi.getPlacesInviteCode, {params: place});
}


export function PlaceCounseling_addPlace(place) {
    return axios.post(CounselingApi.addPlace, place);
}

export  function placeCounseling_changeStatus(place){
    return axios.put(CounselingApi.CHANGE_STATUS,place)
}


export function PlaceCounseling_deletePlace(place) {
    return axios.put(CounselingApi.deletePlace,  place);
}

export function PlaceCounseling_updatePlace(place) {
    return axios.put(CounselingApi.updatePlace, place);
}


export function PlaceCounseling_updateOrder(place) {
    return axios.post(CounselingApi.updateOrder, place);
}

export function PlaceCounseling_query(data) {
    return axios.post(CounselingApi.query, data);
}

export function PlaceCounseling_GetMultimedias(data) {
    return axios.get(CounselingApi.getMultimedias, {params:data});
}
export function placeCounseling_getBuyableByPlace(data) {
    return axios.get(CounselingApi.getBuyableByPlace, {params:data});
}
export function PlaceCounseling_addMultimeida(data) {
    return axios.post(CounselingApi.addMultimedia, data);
}

export function PlaceCounseling_addMultimeidaList(data) {
    return axios.post(CounselingApi.addMultimediaList, data);
}

export function PlaceCounseling_setDefaultMultimedia(data) {
    return axios.post(CounselingApi.setDefaultMultimedia, data);
}

export function PlaceCounseling_deleteMultimedia(data) {
    return axios.put(CounselingApi.deleteMultimedia,data );
}
