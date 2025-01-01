import {AuthApi} from "./NETWORKCONSTS";

export function setupAxios(axios) {
    axios?.interceptors?.request?.use(
        (config) => {
            config.baseURL = AuthApi.BASEURL;
            return config;
        },
        (err) => {
            console.log("err", err);
            Promise.reject(err);

        }
    );



}
