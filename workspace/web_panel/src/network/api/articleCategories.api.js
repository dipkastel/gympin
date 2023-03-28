import axios from "axios";
import {ArticleCategoryApi} from "./const_api";

export function ArticleCategory_add(data) {
  return axios.post(ArticleCategoryApi.add, data);
}
export function ArticleCategory_delete(data) {
  return axios.put(ArticleCategoryApi.delete,  data );
}
export function ArticleCategory_getAll() {
  return axios.get(ArticleCategoryApi.getAll);
}
export function ArticleCategory_getbyId(data) {
  return axios.get(ArticleCategoryApi.getById, { params: data });
}
export function ArticleCategory_update(data) {
  return axios.put(ArticleCategoryApi.update, data);
}
