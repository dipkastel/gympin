import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function ticketActiveTimes_getByHall(gate){
    return axios.get(Api_url.ticketActiveTimes.GET_BY_HALL,{params:gate})
}
export  function ticketActiveTimes_getByPlace(place){
    return axios.get(Api_url.ticketActiveTimes.GET_BY_PLACE,{params:place})
}
export  function ticketActiveTimes_addAll(timings){
    return axios.post(Api_url.ticketActiveTimes.ADD_ALL,timings)
}

export  function ticketActiveTimes_delete(timing){
    return axios.put(Api_url.ticketActiveTimes.DELETE,null,{params:timing})
}
