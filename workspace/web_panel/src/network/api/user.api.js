import axios from "axios";
import {UserApi, UserCreditApi} from "./const_api";

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
//settings
export function user_GetUserSettings(data) {
    return axios.get(UserApi.getUserSettings,{params:data});
}
export function user_SetUserSettings(data) {
    return axios.post(UserApi.setUserSettings, data);
}
export function user_UpdateUserStatus(data) {
    return axios.put(UserApi.updateUserStatus, data);
}

//avatar
export function user_UpdateUserAvatar(data) {
    return axios.put(UserApi.updateUserAvatar, data);
}
//userCredit
export function User_getUserCredits(data) {
    return axios.get(UserApi.getUserCredits,{params:data});
}
