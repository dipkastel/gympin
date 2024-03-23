import axios from "axios";
import {userRolesApi} from "./const_api";

//invoice
export function userRoles_add(data) {
    return axios.post(userRolesApi.add, data);
}

export function userRoles_delete(data) {
    return axios.put(userRolesApi.delete, data);
}

 export function userRoles_getAllRoles() {
     return axios.get(userRolesApi.getAllRoles);
 }

// export function userRoles_getAll(_page, _size) {
//     return axios.get(userRolesApi.getAll, {params: {page: _page, size: _size}});
// }
//
// export function userRoles_getById(data) {
//     return axios.get(userRolesApi.getById, {params: data});
// }

export function userRoles_query(data) {
    return axios.post(userRolesApi.query, data);
}
