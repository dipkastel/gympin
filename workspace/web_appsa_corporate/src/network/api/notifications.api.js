import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function notifications_register(data) {
  return axios.post(Api_url.Notification.register,data);
}
