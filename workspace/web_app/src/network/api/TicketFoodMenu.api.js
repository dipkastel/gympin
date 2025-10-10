import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function TicketFoodMenu_query(data) {
    return axios.post(Api_url.ticketMenu.query, data);
}

export function TicketFoodMenu_getDates(data) {
    return axios.get(Api_url.ticketMenu.getDates, {params: data});
}
