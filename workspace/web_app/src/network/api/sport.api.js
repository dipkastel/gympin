import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function sports_query(data) {
    return axios.post(Api_url.sport.query,data);
}
