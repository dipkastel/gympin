import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function ticketBuyable_query(data) {
    return axios.post(Api_url.TicketBuyable.query, data);
}
