import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function user_getById(userId) {
  return axios.get(Api_url.user.GET_BY_ID, { params: { id: userId } });
}

export function user_update(user) {
  return axios.put(Api_url.user.UPDATE_USER, user);
}

export function user_updateAvatar(avatar) {
  return axios.put(Api_url.user.UPDATE_AVATAR, avatar);
}

export function user_getMyPlaceWallet(data) {
  return axios.post(Api_url.user.getMyPlaceWallet, data);
}


export function user_query(data) {
  return axios.post(Api_url.user.query, data);
}
