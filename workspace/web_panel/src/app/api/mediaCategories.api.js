import axios from "axios";
import {MultimediaApi, multimediaCategoryApi, UserApi} from "./const_api";
//media

export function multimediacategory_add(data) {
    return axios.post(multimediaCategoryApi.add,data);
}
export function multimediacategory_delete(data) {
    return axios.delete(multimediaCategoryApi.delete,{data:data});
}
export function multimediacategory_getAll() {
    return axios.get(multimediaCategoryApi.getAll);
}
export function multimediacategory_getbyId(data) {
    return axios.get(multimediaCategoryApi.getById,{params:data});
}
export function multimediacategory_update(data) {
    return axios.put(multimediaCategoryApi.update,data);
}

