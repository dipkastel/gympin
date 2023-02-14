import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function notification_GetByUser() {
    return axios.get(Api_url.Notification.getUserNotifications);
}
