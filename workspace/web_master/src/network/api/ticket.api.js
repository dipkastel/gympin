import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Ticket_enter(ticket){
    return axios.get(Api_url.ticket.enter,{params:ticket})
}

export function ticket_getById(data) {
    return axios.get(Api_url.ticket.getById, {params: data});
}

export function ticket_scanned(data) {
    return axios.get(Api_url.ticket.scannedTicket, {params: data});
}

export function ticket_getEnterRequested(data) {
    return axios.get(Api_url.ticket.getEnterRequested, {params: data});
}

export function ticket_acceptEnterRequested(data) {
    return axios.get(Api_url.ticket.acceptEnterRequested, {params: data});
}

export function ticket_getUserEntered(data) {
    return axios.get(Api_url.ticket.getUserEntered, {params: data});
}

export function ticket_getActiveTickets(data) {
    return axios.get(Api_url.ticket.getActiveTickets, {params: data});
}

export function ticket_getUserPlaceTicket(data) {
    return axios.post(Api_url.ticket.getUserTicketsByPlace,  data);
}


export function ticket_addEntryMessage(data) {
    return axios.post(Api_url.ticket.addEntryMessage,  data);
}

export function ticket_exitRequest(data) {
    return axios.get(Api_url.ticket.exitRequest, {params: data});
}

export function ticket_enterRequest(data) {
    return axios.post(Api_url.ticket.enterRequest,  data);
}


export function ticket_deleteEntryMessage(data) {
    return axios.post(Api_url.ticket.deleteEntryMessage, null, data);
}

export function ticket_increaseExpireDate(data) {
    return axios.post(Api_url.ticket.increaseExpireDate,  data);
}
