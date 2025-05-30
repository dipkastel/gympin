import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function TicketFoods_getAll() {
    return axios.get(Api_url.ticketFood.getAll);
}

export function TicketFoods_getById(place) {
    return axios.get(Api_url.ticketFood.getById, {params: place});
}

export function TicketFoods_add(place) {
    return axios.post(Api_url.ticketFood.add, place);
}

export function TicketFoods_delete(place) {
    return axios.put(Api_url.ticketFood.delete, place);
}

export function TicketFoods_update(place) {
    return axios.put(Api_url.ticketFood.update, place);
}

export function TicketFoods_query(data) {
    return axios.post(Api_url.ticketFood.query, data);
}
