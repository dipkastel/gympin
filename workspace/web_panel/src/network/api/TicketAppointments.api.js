import axios from "axios";
import {TicketAppointmentsApi} from "./const_api";

export function TicketAppointments_add(data) {
    return axios.post(TicketAppointmentsApi.add, data);
}

export function TicketAppointments_delete(data) {
    return axios.put(TicketAppointmentsApi.delete, data);
}

export function TicketAppointments_getAll() {
    return axios.get(TicketAppointmentsApi.getAll);
}

export function TicketAppointments_getDiscountHistory(data) {
    return axios.get(TicketAppointmentsApi.getTicketSubscribeDiscountHistory, {params: data});
}

export function TicketAppointments_getDiscountHistoryByUser(data) {
    return axios.get(TicketAppointmentsApi.getTicketSubscribeDiscountHistoryByUser, {params: data});
}

export function TicketAppointments_update(data) {
    return axios.put(TicketAppointmentsApi.update, data);
}

export function TicketAppointments_ChangeTicketAppointmentsStatus(data) {
    return axios.post(TicketAppointmentsApi.ChangeTicketSubscribeStatus, data);
}

export function TicketAppointments_getById(data) {
    return axios.get(TicketAppointmentsApi.getById, {params: data});
}

export function TicketAppointments_getByCounseling(data) {
    return axios.get(TicketAppointmentsApi.getByCounseling, {params: data});
}

export function TicketAppointments_query(data) {
    return axios.post(TicketAppointmentsApi.query, data);
}



