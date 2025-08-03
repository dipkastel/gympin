import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function service_GetActiveUsersByCorporate(data) {
    return axios.post(Api_url.service.GET_ACTIVE_USERS_BY_CORPORATE, data);
}
