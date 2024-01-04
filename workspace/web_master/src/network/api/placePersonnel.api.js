import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function placePersonnel_add(data) {
    return axios.post(Api_url.placePersonnel.add, data);
}

export function placePersonnel_delete(data) {
    return axios.put(Api_url.placePersonnel.delete, null, {params: data});
}

export function placePersonnel_update(data) {
    return axios.put(Api_url.placePersonnel.update, data);
}

export function placePersonnel_ByPlace(data) {
    return axios.get(Api_url.placePersonnel.PersonnelByPlace, {params: data});
}


export function placePersonnel_getAccess(data) {
    return axios.get(Api_url.placePersonnel.getUserPlaceAccess, {params: data});
}

export function placePersonnel_updatePersonnelAccess(data) {
    return axios.post(Api_url.placePersonnel.updatePersonnelAccess,  data);
}


export function placePersonnel_getGateAccess(data) {
    return axios.get(Api_url.placePersonnel.getUserPlaceHallAccess, {params: data});
}

export function placePersonnel_updatePersonnelGateAccess(data) {
    return axios.post(Api_url.placePersonnel.updatePersonnelHallAccess,  data);
}
