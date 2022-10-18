import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function getUserById(userId) {
    return axios.get(Api_url.user.GET_BY_ID,{params:{id:userId}});
}

export function UpdateUser(user) {
    return axios.put(Api_url.user.UPDATE_USER,user);
}
