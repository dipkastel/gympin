import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function ticketSubscribe_getActiveTimesByTicketSubscribe(data) {
    return axios.get(Api_url.TicketSubscribe.getActiveTimesByTicketSubscribe,{ params: data });
}


export function ticketSubscribe_getByPlace(data) {
    return axios.get(Api_url.TicketSubscribe.getByPlace,{ params : data });
}

