import axios from "axios";
import {TicketApi} from "./const_api";

//ticket
export function ticket_add(data) {
    return axios.post(TicketApi.add, data);
}
export function ticket_delete(data) {
    return axios.delete(TicketApi.delete, {data: data});
}

export function ticket_getAll(_page, _size) {
    return axios.get(TicketApi.getAll, {params: {page: _page, size: _size}});
}
export function ticket_query(data) {
    return axios.post(TicketApi.query, data);
}

export function ticket_getById(data) {
    return axios.get(TicketApi.getById, {params: data});
}

export function ticket_update(data) {
    return axios.put(TicketApi.update, data);
}

export function ticket_GetCount(data) {
    return axios.get(TicketApi.countFilter, data);
}
