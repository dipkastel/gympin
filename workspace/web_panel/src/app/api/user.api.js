import axios from "axios";
import {UserApi} from "./const_api";
//user
export function user_add(user) {
    return axios.post(UserApi.add,user);
}
export function user_delete(user) {
    return axios.delete(UserApi.delete,{data:user});
}
export function user_getAll() {
    return axios.get(UserApi.getAll);
}
export function user_getById(user) {
    return axios.get(UserApi.getById,{params:user});
}
export function user_update(user) {
    return axios.put(UserApi.update,user);
}


