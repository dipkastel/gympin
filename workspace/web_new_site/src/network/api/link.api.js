import {ArticleApi, LinkApi} from "../NETWORKCONSTS";
import axios from "axios";

export function link_getByCode(data) {
    return axios.get(LinkApi.getByCode, {params: data});
}
