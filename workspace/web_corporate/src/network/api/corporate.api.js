import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function corporate_getByUser(params){
    return axios.get(Api_url.corporate.GET_BY_USER,{params:params})
}

export  function corporate_getById(params){
    return axios.get(Api_url.corporate.GET_BY_ID,{params: {id:params}})
}

export  function corporate_UpdateLogo(data){
    return axios.put(Api_url.corporate.updateLogo,data)
}

export function corporate_getTotalDeposit(data) {
    return axios.get(Api_url.corporate.getTotalDeposit,{ params: data });
}

export function corporate_getTransactions(data) {
    return axios.get(Api_url.corporate.getTransactions,{ params: data });
}
export  function corporate_Update(data){
    return axios.put(Api_url.corporate.update,data)
}