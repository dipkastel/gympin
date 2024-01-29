import axios from "axios";
import {TicketCoursesApi} from "./const_api";

export function TicketCourses_add(data) {
    return axios.post(TicketCoursesApi.add, data);
}

export function TicketCourses_delete(data) {
    return axios.put(TicketCoursesApi.delete, data);
}

export function TicketCourses_getAll() {
    return axios.get(TicketCoursesApi.getAll);
}

export function TicketCourses_update(data) {
    return axios.put(TicketCoursesApi.update, data);
}

export function TicketCourses_ChangeTicketCourseStatus(data) {
    return axios.post(TicketCoursesApi.changeTicketCourseStatus, data);
}

export function TicketCourses_getById(data) {
    return axios.get(TicketCoursesApi.getById, {params: data});
}

export function TicketCourses_getByPlaceId(data) {
    return axios.get(TicketCoursesApi.getByPlaceId, {params: data});
}

export function TicketCourses_getTicketCourseSports(data) {
    return axios.get(TicketCoursesApi.getSports, {params: data});
}

export function TicketCourses_addSport(data) {
    return axios.post(TicketCoursesApi.addSport, data);
}

export function TicketCourses_deleteSport(data) {
    return axios.put(TicketCoursesApi.deleteSport, data);
}

export function TicketCourses_getTicketCourseCoaches(data) {
    return axios.get(TicketCoursesApi.getCoaches, {params: data});
}

export function TicketCourses_addCoach(data) {
    return axios.post(TicketCoursesApi.addCoach, data);
}

export function TicketCourses_deleteCoach(data) {
    return axios.put(TicketCoursesApi.deleteCoach, data);
}

export function TicketCourses_query(data) {
    return axios.post(TicketCoursesApi.query, data);
}

export function TicketCourses_addCourseActiveTimes(data) {
    return axios.post(TicketCoursesApi.addCourseActiveTimes, data);
}

export function TicketCourses_deleteCourseActiveTimes(data) {
    return axios.put(TicketCoursesApi.deleteCourseActiveTimes, data);
}

export function TicketCourses_getActiveTimesByTicketCourse(data) {
    return axios.get(TicketCoursesApi.getActiveTimesByTicketCourse, {params: data});
}
