import axios from "axios";
import {TicketBuyableApi} from "./const_api";

//buyable
export function buyable_query(data) {
  return axios.post(TicketBuyableApi.query, data);
}

export function buyable_setTicketBeneficiary(data) {
  return axios.post(TicketBuyableApi.setTicketBeneficiary, data);
}

export function buyable_getById(data) {
  return axios.get(TicketBuyableApi.getById, {params: data});
}


export function buyable_getWanderers() {
  return axios.get(TicketBuyableApi.getWanderers);
}
