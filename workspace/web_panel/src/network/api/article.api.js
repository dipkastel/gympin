import axios from "axios";
import {ArticleApi} from "./const_api";

export function Article_add(data) {
    return axios.post(ArticleApi.add, data);
}
export function Article_delete(data) {
    return axios.put(ArticleApi.delete,   data );
}

export function Article_getAll(_page, _size) {
    return axios.get(ArticleApi.getAll, {params: {page: _page, size: _size}});
}
export function Article_query(data) {
    return axios.post(ArticleApi.query, data);
}

export function Article_getById(data) {
    return axios.get(ArticleApi.getById, {params: data});
}

export function Article_update(data) {
    return axios.put(ArticleApi.update, data);
}

export function Article_updateArticleImage(data) {
    return axios.post(ArticleApi.updateArticleImage, data);
}
