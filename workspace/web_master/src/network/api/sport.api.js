import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function getAllSports() {
    return axios.get(Api_url.sport.GET_ALL);
}
