import axios from "axios";
import {CateringApi, PlaceApi, SportApi, TicketFoodMenuApi} from "./const_api";

export function TicketFoodMenu_getAll() {
    return axios.get(TicketFoodMenuApi.getAll);
}

export function TicketFoodMenu_getById(place) {
    return axios.get(TicketFoodMenuApi.getById, {params: place});
}

export function TicketFoodMenu_add(place) {
    return axios.post(TicketFoodMenuApi.add, place);
}

export function TicketFoodMenu_delete(place) {
    return axios.put(TicketFoodMenuApi.delete,  place);
}

export function TicketFoodMenu_update(place) {
    return axios.put(TicketFoodMenuApi.update, place);
}

export function TicketFoodMenu_query(data) {
    return axios.post(TicketFoodMenuApi.query, data);
}

export function TicketFoodMenu_getDates(data) {
    return axios.get(TicketFoodMenuApi.getDates, {params: data});
}

export function TicketFoodMenu_copyDate(data) {
    return axios.post(TicketFoodMenuApi.copyDate,  data);
}
