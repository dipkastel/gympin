import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function ticketSubscribeActiveTimes_getByHall(gate){
    return axios.get(Api_url.ticketSubscribeActiveTimes.GET_BY_HALL,{params:gate})
}
export  function ticketSubscribeActiveTimes_getByPlace(place){
    return axios.get(Api_url.ticketSubscribeActiveTimes.GET_BY_PLACE,{params:place})
}
export  function ticketSubscribeActiveTimes_addAll(timings){
    return axios.post(Api_url.ticketSubscribeActiveTimes.ADD_ALL,timings)
}

export  function ticketSubscribeActiveTimes_delete(timing){
    return axios.put(Api_url.ticketSubscribeActiveTimes.DELETE,null,{params:timing})
}
