import axios from "axios";
import {TicketSubscribesApi} from "./const_api";

export function TicketSubscribes_add(data) {
    return axios.post(TicketSubscribesApi.add, data);
}

export function TicketSubscribes_delete(data) {
    return axios.put(TicketSubscribesApi.delete, data);
}

export function TicketSubscribes_getAll() {
    return axios.get(TicketSubscribesApi.getAll);
}

export function TicketSubscribes_getDiscountHistory(data) {
    return axios.get(TicketSubscribesApi.getTicketSubscribeDiscountHistory, {params: data});
}

export function TicketSubscribes_update(data) {
    return axios.put(TicketSubscribesApi.update, data);
}

export function TicketSubscribes_ChangeTicketSubscribesStatus(data) {
    return axios.post(TicketSubscribesApi.ChangeTicketSubscribeStatus, data);
}

export function TicketSubscribes_getById(data) {
    return axios.get(TicketSubscribesApi.getById, {params: data});
}

export function TicketSubscribes_getByPlace(data) {
    return axios.get(TicketSubscribesApi.getByPlace, {params: data});
}

export function TicketSubscribes_getTicketSubscribesSports(data) {
    return axios.get(TicketSubscribesApi.getSports, {params: data});
}

export function TicketSubscribes_addSport(data) {
    return axios.post(TicketSubscribesApi.addSport, data);
}

export function TicketSubscribes_deleteSport(data) {
    return axios.put(TicketSubscribesApi.deleteSport, data);
}

export function TicketSubscribes_query(data) {
    return axios.post(TicketSubscribesApi.query, data);
}


export function TicketSubscribes_getTicketSubscribeCoaches(data) {
    return axios.get(TicketSubscribesApi.getCoaches, {params: data});
}

export function TicketSubscribes_addCoach(data) {
    return axios.post(TicketSubscribesApi.addCoach, data);
}

export function TicketSubscribes_deleteCoach(data) {
    return axios.put(TicketSubscribesApi.deleteCoach, data);
}


export function TicketSubscribes_addSubscribeActiveTimes(data) {
    return axios.post(TicketSubscribesApi.addSubscribeActiveTimes, data);
}

export function TicketSubscribes_deleteSubscribeActiveTimes(data) {
    return axios.put(TicketSubscribesApi.deleteSubscribeActiveTimes, data);
}

export function TicketSubscribes_getActiveTimesByTicketSubscribe(data) {
    return axios.get(TicketSubscribesApi.getActiveTimesByTicketSubscribe, {params: data});
}
