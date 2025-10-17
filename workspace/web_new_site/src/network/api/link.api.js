import {LinkApi} from "../NETWORKCONSTS.js";
import axios from "axios";

export function link_getByCode(data) {
    return axios.get(LinkApi.getByCode, {params: data});
}
