import {AuthApi} from "../network/const/NETWORKCONSTS";


export function setupAxios(axios, store) {
    axios.interceptors.request.use(
        (config) => {
            const {
                auth: { authToken },
            } = store.getState();

            if (authToken) {
                console.log("Bearer " + authToken);
                config.headers.Authorization = "Bearer " + authToken;
            }
            config.baseURL = AuthApi.BASEURL;
            return config;
        },
        (err) => {
            console.log("err", err);
            Promise.reject(err);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            if (error.response.status === 401) {
                console.log("expire");
                window.location = "/logout";
            }
            return Promise.reject(error);
        }
    );
}
