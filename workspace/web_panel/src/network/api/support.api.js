import axios from "axios";
import {SupportApi, TicketFoodMenuApi} from "./const_api";

//place
export function Support_getAll() {
    return axios.get(SupportApi.getAll);
}

export function Support_getById(param) {
    return axios.get(SupportApi.getById,{params:param});
}

export function Support_add(data) {
    return axios.post(SupportApi.add,data);
}

export function Support_delete(item) {
    return axios.put(SupportApi.delete,  item);
}

export function Support_addMessage(data) {
    return axios.post(SupportApi.addMessage, data);
}

export function Support_query(data) {
    return axios.post(SupportApi.query, data);
}
