import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function user_getById(userId) {
    return axios.get(Api_url.user.GET_BY_ID,{params:{id:userId}});
}

export function user_updateMe(user) {
    return axios.put(Api_url.user.UPDATE_USER,user);
}


export function user_updateAvatar(avatar) {
    return axios.put(Api_url.user.UPDATE_AVATAR,avatar);
}
