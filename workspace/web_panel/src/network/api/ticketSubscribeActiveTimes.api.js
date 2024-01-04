import axios from "axios";
import {ticketSubscribeActiveTimesApi} from "./const_api";

export function ticketSubscribeActiveTimes_add(data) {
    return axios.post(ticketSubscribeActiveTimesApi.add, data);
}

export function ticketSubscribeActiveTimes_addAll(data) {
    return axios.post(ticketSubscribeActiveTimesApi.addAll, data);
}

export function ticketSubscribeActiveTimes_delete(data) {
    return axios.put(ticketSubscribeActiveTimesApi.delete,  data);
}

export function ticketSubscribeActiveTimes_getAll() {
    return axios.get(ticketSubscribeActiveTimesApi.getAll);
}

export function ticketSubscribeActiveTimes_update(data) {
    return axios.put(ticketSubscribeActiveTimesApi.update, data);
}

export function ticketSubscribeActiveTimes_getById(data) {
    return axios.get(ticketSubscribeActiveTimesApi.getById, {params: data});
}

export function ticketSubscribeActiveTimes_getByHall(data) {
    return axios.get(ticketSubscribeActiveTimesApi.getByHall, {params: data});
}

export function ticketSubscribeActiveTimes_getByPlace(data) {
    return axios.get(ticketSubscribeActiveTimesApi.getByPlace, {params: data});
}
