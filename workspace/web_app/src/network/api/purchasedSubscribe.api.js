import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function purchasedSubscribe_getById(data) {
    return axios.get(Api_url.purchasedSubscribe.getById, {params: data});
}
export function purchasedSubscribe_getByKey(data) {
    return axios.get(Api_url.purchasedSubscribe.getByKey, {params: data});
}
export function purchasedSubscribe_delete(data) {
    return axios.put(Api_url.purchasedSubscribe.DELETE,null ,{params: data});
}
export function purchasedSubscribe_checkout(data) {
    return axios.post(Api_url.purchasedSubscribe.checkout,  data);
}

export function purchasedSubscribe_enterRequest(data) {
    return axios.post(Api_url.purchasedSubscribe.enterRequest,  data);
}

export function purchasedSubscribe_exitRequest(data) {
    return axios.get(Api_url.purchasedSubscribe.exitRequest, {params: data});
}
