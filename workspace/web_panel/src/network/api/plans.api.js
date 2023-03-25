import axios from "axios";
import {PlaceApi, PlansApi} from "./const_api";

export function Plans_add(data) {
    return axios.post(PlansApi.add, data);
}

export function Plans_delete(data) {
    return axios.put(PlansApi.delete, null, {params: data});
}

export function Plans_getAll() {
    return axios.get(PlansApi.getAll);
}

export function Plans_getDiscountHistory(data) {
    return axios.get(PlansApi.getPlanDiscountHistory,{params:data});
}

export function Plans_update(data) {
    return axios.put(PlansApi.update, data);
}

export function Plans_getById(data) {
    return axios.get(PlansApi.getById, {params: data});
}
export function Plans_getByPlaceId(data) {
    return axios.get(PlansApi.getByPlaceId, {params: data});
}

export function Plans_getSports(data) {
    return axios.get(PlansApi.getSports, {params: data});
}

export function Plans_addSport(data) {
    return axios.post(PlansApi.addSport, data);
}

export function Plans_deleteSport(data) {
    return axios.put(PlansApi.deleteSport, data);
}

export function Plans_query(data) {
    return axios.post(PlansApi.query, data);
}
