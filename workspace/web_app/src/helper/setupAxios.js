import {AuthApi} from "../network/const/NETWORKCONSTS";
import {refreshToken} from "../network/api/account.api";
import {useSelector} from "react-redux";
import {authActions} from "./redux/actions/authActions";


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
                reToken(result=>{
                    window.location = window.location;
                })
            }
            return Promise.reject(error);
        }
    );



    function reToken(callBack) {
        const rToken = store.getState().auth.refreshToken
        refreshToken(rToken).then(result=>{
            store.dispatch(authActions.login(result.data.Data))
            callBack(result);
        }).catch(e=>console.log(e))
    }

}
