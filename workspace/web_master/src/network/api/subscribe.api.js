import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function purchasedSubscribe_enter(subscribe){
    return axios.get(Api_url.purchasedSubscribe.enter,{params:subscribe})
}

export function purchasedSubscribe_getById(data) {
    return axios.get(Api_url.purchasedSubscribe.getById, {params: data});
}

export function purchasedSubscribe_scanned(data) {
    return axios.get(Api_url.purchasedSubscribe.scannedSubscribe, {params: data});
}

export function purchasedSubscribe_getEnterRequested(data) {
    return axios.get(Api_url.purchasedSubscribe.getEnterRequested, {params: data});
}

export function purchasedSubscribe_acceptEnterRequested(data) {
    return axios.post(Api_url.purchasedSubscribe.acceptEnterRequested,data);
}

export function purchasedSubscribe_getUserEntered(data) {
    return axios.get(Api_url.purchasedSubscribe.getUserEntered, {params: data});
}

export function purchasedSubscribe_getActiveSubscribes(data) {
    return axios.get(Api_url.purchasedSubscribe.getActiveSubscribes, {params: data});
}

export function purchasedSubscribe_getPlaceSubscribes(data) {
    return axios.get(Api_url.purchasedSubscribe.getPlaceSubscribes, {params: data});
}

export function purchasedSubscribe_getUserPlaceSubscribe(data) {
    return axios.post(Api_url.purchasedSubscribe.getUserSubscribesByPlace,  data);
}

export function purchasedSubscribe_addEntryMessage(data) {
    return axios.post(Api_url.purchasedSubscribe.addEntryMessage,  data);
}

export function purchasedSubscribe_exitUserOfPlace(data) {
    return axios.get(Api_url.purchasedSubscribe.exitUserOfPlace, {params: data});
}

export function purchasedSubscribe_enterRequest(data) {
    return axios.post(Api_url.purchasedSubscribe.enterRequest,  data);
}

export function purchasedSubscribe_deleteEntryMessage(data) {
    return axios.post(Api_url.purchasedSubscribe.deleteEntryMessage, null, data);
}

export function purchasedSubscribe_addEnterToSubscribe(data) {
    return axios.post(Api_url.purchasedSubscribe.addEnterToSubscribe, data);
}
export function purchasedSubscribe_increaseExpireDate(data) {
    return axios.post(Api_url.purchasedSubscribe.increaseExpireDate,  data);
}
