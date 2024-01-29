import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function purchasedCourse_getById(data) {
    return axios.get(Api_url.purchasedCourse.getById, {params: data});
}
export function purchasedCourse_delete(data) {
    return axios.put(Api_url.purchasedCourse.DELETE,null ,{params: data});
}
export function purchasedCourse_checkout(data) {
    return axios.post(Api_url.purchasedCourse.checkout,  data);
}

export function purchasedCourse_enterRequest(data) {
    return axios.post(Api_url.purchasedCourse.enterRequest,  data);
}

export function purchasedCourse_exitRequest(data) {
    return axios.get(Api_url.purchasedCourse.exitRequest, {params: data});
}
