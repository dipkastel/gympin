import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export  function gym_getMyPlaceGymById(id){
    return axios.get(Api_url.gym.getMyPlaceGymById,{params:{id:id}})
}

export  function gym_changeStatus(place){
    return axios.put(Api_url.gym.CHANGE_STATUS,place)
}

export  function gym_getMultimedias(placeId){
    return axios.get(Api_url.gym.GET_MULTIMEDIAS,{params:{id:placeId}})
}

export  function gym_AddMultimedia(data){
    return axios.post(Api_url.gym.ADD_MULTIMEDIA,data)
}


export  function gym_deleteMultimedia(data){
    return axios.put(Api_url.gym.DELETE_MULTIMEDIA,data)
}

export  function gym_update(data){
    return axios.put(Api_url.gym.UPDATE,data)
}

export  function gym_UpdateContract(data){
    return axios.post(Api_url.gym.updateContract,data)
}

export  function gym_sendContractCode(data){
    return axios.post(Api_url.gym.sendContractCode,data)
}

export  function gym_SignContract(data){
    return axios.post(Api_url.gym.signContract,data)
}
