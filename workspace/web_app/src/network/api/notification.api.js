import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function notificationGetByUser() {
    return axios.get(Api_url.Notification.getUserNotifications);
}
