import {AuthApi} from "./api/NETWORKCONSTS";
import {authActions} from "../helper/redux/actions/AuthActions";
import {refreshToken} from "./api/account.api";
import {sagaActions} from "../helper/redux/actions/SagaActions";


export function setupAxios(axios, store) {
    var loading = false;
    axios.interceptors.request.use(
        (config) => {
            if(loading&&config.url!="v1/account/refreshToken") {
                // console.log("block expired request");
                return null;
            }
            const {auth: { token }} = store.getState();
            if (token) {
                // console.log("Bearer " + token);
                config.headers.Authorization = "Bearer " + token;
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
                reToken(result=>{
                    window.location = window.location;
                })
            }
            return Promise.reject(error);
        }
    );


    function reToken(callBack) {
        loading = true;
        const rToken = store.getState().auth.refreshToken
        refreshToken(rToken).then(result=>{
            store.dispatch(authActions.SetToken(result.data.Data.Token))
            store.dispatch(authActions.SetRefreshToken(result.data.Data.RefreshToken))
            setTimeout(function() {
                callBack(result);
                loading = false;
            }, 3*1000);
        }).catch(e=>{
            store.dispatch(sagaActions.RequestLogout());
        })
    }
}
