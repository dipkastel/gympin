import axios from "axios";
import {NoteApi} from "./const_api";

export function note_add(data) {
    return axios.post(NoteApi.add, data);
}
export function note_delete(data) {
    return axios.put(NoteApi.delete, null,{ params: data });
}
export function note_getAll() {
    return axios.get(NoteApi.getAll);
}
export function note_getById(data) {
    return axios.get(NoteApi.getById,{ params: data });
}
export function note_getByParam(data) {
    return axios.post(NoteApi.getByParam, data );
}
export function note_update(data) {
    return axios.put(NoteApi.update, data);
}
