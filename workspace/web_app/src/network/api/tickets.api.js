import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function ticket_add(data) {
    return axios.post(Api_url.ticket.ADD,  data);
}

export function ticket_getByUser(data) {
    return axios.get(Api_url.ticket.GET_BY_USER, {params: data});
}
export function ticket_getById(data) {
    return axios.get(Api_url.ticket.getById, {params: data});
}
export function ticket_delete(data) {
    return axios.put(Api_url.ticket.DELETE,null ,{params: data});
}
export function ticket_checkout(data) {
    return axios.post(Api_url.ticket.checkout,  data);
}

export function ticket_enterRequest(data) {
    return axios.post(Api_url.ticket.enterRequest,  data);
}

export function ticket_exitRequest(data) {
    return axios.get(Api_url.ticket.exitRequest, {params: data});
}
