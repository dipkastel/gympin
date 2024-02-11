import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function TicketCourses_getByPlace(place){
    return axios.get(Api_url.TicketCourse.getByPlaceId,{params:place})
}

export  function TicketCourses_getById(place){
    return axios.get(Api_url.TicketCourse.getById,{params:place})
}

export  function TicketCourses_getActiveTimesByTicketCourse(place){
    return axios.get(Api_url.TicketCourse.getActiveTimesByTicketCourse,{params:place})
}

export  function TicketCourses_add(data){
    return axios.post(Api_url.TicketCourse.add,data)
}


export  function TicketCourses_delete(data){
    return axios.put(Api_url.TicketCourse.delete,null,{params:data})
}


export  function TicketCourses_update(data){
    return axios.put(Api_url.TicketCourse.update,data)
}

export function TicketCourses_ChangeTicketCoursesStatus(data) {
    return axios.post(Api_url.TicketCourse.ChangeTicketCourseStatus, data);
}

export function TicketCourses_getTicketCoursesSports(data) {
    return axios.get(Api_url.TicketCourse.getSports, {params: data});
}

export function TicketCourses_addSport(data) {
    return axios.post(Api_url.TicketCourse.addSport, data);
}

export function TicketCourses_deleteSport(data) {
    return axios.put(Api_url.TicketCourse.deleteSport, data);
}

export function TicketCourses_getCoaches(data) {
    return axios.get(Api_url.TicketCourse.getCoaches, {params: data});
}

export function TicketCourses_addCoach(data) {
    return axios.post(Api_url.TicketCourse.addCoach, data);
}

export function TicketCourses_deleteCoach(data) {
    return axios.put(Api_url.TicketCourse.deleteCoach, data);
}
