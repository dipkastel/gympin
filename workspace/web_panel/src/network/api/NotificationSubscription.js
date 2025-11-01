import axios from "axios";
import {NotificationSubscriptionApi} from "./const_api";

export function NotificationSubscription_add(data) {
  return axios.post(NotificationSubscriptionApi.add,data);
}
