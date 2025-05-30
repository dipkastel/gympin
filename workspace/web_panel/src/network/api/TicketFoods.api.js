import axios from "axios";
import {CateringApi, PlaceApi, SportApi, TicketFoodApi} from "./const_api";

export function TicketFoods_getAll() {
    return axios.get(TicketFoodApi.getAll);
}

export function TicketFoods_getById(place) {
    return axios.get(TicketFoodApi.getById, {params: place});
}

export function TicketFoods_add(place) {
    return axios.post(TicketFoodApi.add, place);
}

export function TicketFoods_delete(place) {
    return axios.put(TicketFoodApi.delete,  place);
}

export function TicketFoods_update(place) {
    return axios.put(TicketFoodApi.update, place);
}

export function TicketFoods_query(data) {
    return axios.post(TicketFoodApi.query, data);
}
