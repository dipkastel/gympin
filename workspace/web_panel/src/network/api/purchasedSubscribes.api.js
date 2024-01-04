import axios from "axios";
import {purchasedSubscribeApi} from "./const_api";


export function PurchasedSubscribe_getAll() {
    return axios.get(purchasedSubscribeApi.getAll);
}

export function purchasedSubscribe_update(data) {
    return axios.put(purchasedSubscribeApi.update, data);
}

export function purchasedSubscribe_getById(data) {
    return axios.get(purchasedSubscribeApi.getById, {params: data});
}

export function purchasedSubscribe_exitUserOfPlace(data) {
    return axios.get(purchasedSubscribeApi.exitUserOfPlace, {params: data});
}
export function purchasedSubscribe_query(data) {
    return axios.post(purchasedSubscribeApi.query, data);
}
export function purchasedSubscribe_updateStatus(data) {
    return axios.post(purchasedSubscribeApi.updateStatus, data);
}
export function purchasedSubscribe_addEnterToSubscribe(data) {
    return axios.post(purchasedSubscribeApi.addEnterToSubscribe, data);
}
export function purchasedSubscribe_addEnterRequest(data) {
    return axios.post(purchasedSubscribeApi.enterRequest, data);
}

export function purchasedSubscribe_acceptEnterRequested(data) {
    return axios.post(purchasedSubscribeApi.acceptEnterRequested, data);
}

export function purchasedSubscribe_increaseExpireDate(data) {
    return axios.post(purchasedSubscribeApi.increaseExpireDate, data);
}
