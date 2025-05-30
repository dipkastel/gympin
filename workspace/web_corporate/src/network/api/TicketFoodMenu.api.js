import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function TicketFoodMenu_getAll() {
    return axios.get(Api_url.ticketMenu.getAll);
}

export function TicketFoodMenu_getById(place) {
    return axios.get(Api_url.ticketMenu.getById, {params: place});
}

export function TicketFoodMenu_add(place) {
    return axios.post(Api_url.ticketMenu.add, place);
}

export function TicketFoodMenu_delete(place) {
    return axios.put(Api_url.ticketMenu.delete, place);
}

export function TicketFoodMenu_update(place) {
    return axios.put(Api_url.ticketMenu.update, place);
}

export function TicketFoodMenu_query(data) {
    return axios.post(Api_url.ticketMenu.query, data);
}

export function TicketFoodMenu_getDates(data) {
    return axios.get(Api_url.ticketMenu.getDates, {params: data});
}
