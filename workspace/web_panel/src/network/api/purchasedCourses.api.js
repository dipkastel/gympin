import axios from "axios";
import {purchasedCourseApi} from "./const_api";


export function PurchasedCourse_getAll() {
    return axios.get(purchasedCourseApi.getAll);
}

export function purchasedCourse_update(data) {
    return axios.put(purchasedCourseApi.update, data);
}

export function purchasedCourse_getById(data) {
    return axios.get(purchasedCourseApi.getById, {params: data});
}

export function purchasedCourse_exitUserOfPlace(data) {
    return axios.get(purchasedCourseApi.exitUserOfPlace, {params: data});
}

export function purchasedCourse_query(data) {
    return axios.post(purchasedCourseApi.query, data);
}

export function purchasedCourse_updateStatus(data) {
    return axios.post(purchasedCourseApi.updateStatus, data);
}

export function purchasedCourse_addEnterToCourse(data) {
    return axios.post(purchasedCourseApi.addEnterToCourse, data);
}

export function purchasedCourse_addEnterRequest(data) {
    return axios.post(purchasedCourseApi.enterRequest, data);
}

export function purchasedCourse_acceptEnterRequested(data) {
    return axios.post(purchasedCourseApi.acceptEnterRequested, data);
}
