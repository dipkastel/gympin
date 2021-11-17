import axios from "axios";
import {MultimediaApi, UserApi} from "./const_api";
//media
export function media_add(data) {
    return axios.post(MultimediaApi.add,{data:data},{
        headers:{
            'content-type': 'multipart/form-data'
        }
    });
}
export function media_addAudio(data) {
    return axios.post(MultimediaApi.addAudio,{data:data},{
        headers:{
            'content-type': 'multipart/form-data'
        }
    });
}
export function media_addImage(data) {
    return axios.post(MultimediaApi.addImage,{data:data},{
        headers:{
            'content-type': 'multipart/form-data'
        }
    });
}
export function media_addVideo(data) {
    return axios.post(MultimediaApi.addVideo,{data:data},{
        headers:{
            'content-type': 'multipart/form-data'
        }
    });
}
export function media_getAllByType(data) {
    return axios.get(MultimediaApi.getAllByType,{params:data});
}
export function media_getAllId(data) {
    return axios.get(MultimediaApi.getAllId,{params:data});
}
export function media_getAllName(data) {
    return axios.get(MultimediaApi.getAllName,{params:data});
}

export function media_getMultimediaIdByFileName(data) {
    return axios.get(MultimediaApi.getMultimediaIdByFileName,{params:data});
}
