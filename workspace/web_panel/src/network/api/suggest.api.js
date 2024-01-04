import axios from "axios";
import { SuggestApi} from "./const_api";



export function Suggest_add(data) {
    return axios.post(SuggestApi.add, data);
}

export function Suggest_getAll() {
    return axios.get(SuggestApi.getAll);
}

export function Suggest_update(data) {
    return axios.put(SuggestApi.update, data);
}

export function Suggest_getById(data) {
    return axios.get(SuggestApi.getById, {params: data});
}

export function Suggest_query(data) {
    return axios.post(SuggestApi.query, data);
}

export function Suggest_delete(data) {
    return axios.put(SuggestApi.delete,  data );
}
