import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function NotificationSubscription_add(data) {
  return axios.post(Api_url.NotificationSubscription.add,data);
}
