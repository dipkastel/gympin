import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function TicketSubscribes_getByPlace(place){
    return axios.get(Api_url.TicketSubscribe.getByPlaceId,{params:place})
}

export  function TicketSubscribes_getById(place){
    return axios.get(Api_url.TicketSubscribe.getById,{params:place})
}

export  function TicketSubscribes_getActiveTimesByTicketSubscribe(place){
    return axios.get(Api_url.TicketSubscribe.getActiveTimesByTicketSubscribe,{params:place})
}

export function TicketSubscribes_addSubscribeActiveTimes(data) {
    return axios.post(Api_url.TicketSubscribe.addSubscribeActiveTimes, data);
}

export function TicketSubscribes_deleteSubscribeActiveTimes(data) {
    return axios.put(Api_url.TicketSubscribe.deleteSubscribeActiveTimes, data);
}

export  function TicketSubscribes_add(data){
    return axios.post(Api_url.TicketSubscribe.add,data)
}


export  function TicketSubscribes_delete(data){
    return axios.put(Api_url.TicketSubscribe.delete,data)
}


export  function TicketSubscribes_update(data){
    return axios.put(Api_url.TicketSubscribe.update,data)
}

export function TicketSubscribes_ChangeTicketSubscribesStatus(data) {
    return axios.post(Api_url.TicketSubscribe.ChangeTicketSubscribeStatus, data);
}

export function TicketSubscribes_getTicketSubscribesSports(data) {
    return axios.get(Api_url.TicketSubscribe.getSports, {params: data});
}

export function TicketSubscribes_addSport(data) {
    return axios.post(Api_url.TicketSubscribe.addSport, data);
}

export function TicketSubscribes_deleteSport(data) {
    return axios.put(Api_url.TicketSubscribe.deleteSport, data);
}

export function TicketSubscribes_getCoaches(data) {
    return axios.get(Api_url.TicketSubscribe.getCoaches, {params: data});
}

export function TicketSubscribes_addCoach(data) {
    return axios.post(Api_url.TicketSubscribe.addCoach, data);
}

export function TicketSubscribes_deleteCoach(data) {
    return axios.put(Api_url.TicketSubscribe.deleteCoach, data);
}
