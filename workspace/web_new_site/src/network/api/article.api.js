import {ArticleApi} from "../NETWORKCONSTS";
import axios from "axios";


export function Article_query(data) {
    return axios.post(ArticleApi.query, data);
}


export function Article_getById(data) {
    return axios.get(ArticleApi.getById, {params: data});
}
