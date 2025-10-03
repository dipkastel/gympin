import axios from "axios";
import {ticketActiveTimesApi} from "./const_api";

export function ticketActiveTimes_add(data) {
    return axios.post(ticketActiveTimesApi.add, data);
}

export function ticketActiveTimes_addAll(data) {
    return axios.post(ticketActiveTimesApi.addAll, data);
}

export function ticketActiveTimes_delete(data) {
    return axios.put(ticketActiveTimesApi.delete,  data);
}

export function ticketActiveTimes_getAll() {
    return axios.get(ticketActiveTimesApi.getAll);
}

export function ticketActiveTimes_update(data) {
    return axios.put(ticketActiveTimesApi.update, data);
}

export function ticketActiveTimes_getById(data) {
    return axios.get(ticketActiveTimesApi.getById, {params: data});
}

export function ticketActiveTimes_getByHall(data) {
    return axios.get(ticketActiveTimesApi.getByHall, {params: data});
}

export function ticketActiveTimes_getByPlace(data) {
    return axios.get(ticketActiveTimesApi.getByPlace, {params: data});
}
