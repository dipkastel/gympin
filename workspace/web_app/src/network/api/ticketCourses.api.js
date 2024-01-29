import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function ticketCourses_getActiveTimesByTicketCourse(data) {
    return axios.get(Api_url.TicketCourses.getActiveTimesByTicketCourse,{ params: data });
}


export function ticketCourses_getByPlace(data) {
    return axios.get(Api_url.TicketCourses.getByPlace,{ params : data });
}

