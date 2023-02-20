import axios from "axios";
import {UserApi} from "./const_api";

//user
export function user_add(data) {
    return axios.post(UserApi.add, data);
}
export function user_delete(data) {
    return axios.delete(UserApi.delete, {data: data});
}

export function user_getAll(_page, _size) {
    return axios.get(UserApi.getAll, {params: {page: _page, size: _size}});
}
export function user_query(data) {
    return axios.post(UserApi.query, data);
}

export function user_getById(data) {
    return axios.get(UserApi.getById, {params: data});
}

export function user_update(data) {
    return axios.put(UserApi.update, data);
}

export function user_GetCount(data) {
    return axios.get(UserApi.countFilter, data);
}

//status
export function user_GetStatuses() {
    return axios.get(UserApi.getStatuses);
}
export function user_UpdateUserStatus(data) {
    return axios.put(UserApi.updateUserStatus, data);
}

//user_rule
export function user_getUserRoles() {
    return axios.get(UserApi.getUserRoles);
}
export function user_updateUserRoles(data) {
    return axios.put(UserApi.updateUserRole, data);
}

//avatar
export function user_UpdateUserAvatar(data) {
    return axios.put(UserApi.updateUserAvatar, data);
}

