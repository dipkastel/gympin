import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {put, takeLatest} from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserRequested: "[Request User] Action",
    UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
    user: undefined,
    authToken: undefined
};

export const reducer = persistReducer(
    {storage, key: "gympin-auth", whitelist: ["user", "authToken"]},
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const {authToken} = action.payload;

                return {authToken, user: undefined};
            }

            case actionTypes.Register: {
                const {authToken} = action.payload;

                return {authToken, user: undefined};
            }

            case actionTypes.Logout: {
                routerHelpers.forgotLastLocation();
                return initialAuthState;
            }

            case actionTypes.UserLoaded: {
                const {user} = action.payload;
                console.log(user);
                return {...state, user};
            }

            default:
                return state;
        }
    }
);

export const actions = {
    login: authToken => ({type: actionTypes.Login, payload: {authToken}}),
    register: authToken => ({
        type: actionTypes.Register,
        payload: {authToken}
    }),
    logout: () => ({type: actionTypes.Logout}),
    requestUser: user => ({type: actionTypes.UserRequested, payload: {user}}),
    fulfillUser: user => ({type: actionTypes.UserLoaded, payload: {user}})
};

export function* saga() {
    yield takeLatest(actionTypes.Login, function* loginSaga() {
        console.log("in2");
        console.log(actions.requestUser());
        yield put(actions.requestUser());
        console.log("in2");
    });

    yield takeLatest(actionTypes.Register, function* registerSaga() {
        console.log("in1");
        yield put(actions.requestUser());
        console.log("in1");
    });

    yield takeLatest(actionTypes.UserRequested, function* userRequested() {
        // const { data: user } = yield getUserByToken();
        const a = {
            "status": 200,
            "data": {
                "id": 1,
                "username": "admin",
                "email": "admin@demo.com",
                "accessToken": "access-token-8f3ae836da744329a6f93bf20594b5cc",
                "refreshToken": "access-token-f8c137a2c98743f48b643e71161d90aa",
                "roles": [1],
                "pic": "/media/users/300_25.jpg",
                "fullname": "Sean",
                "occupation": "CEO",
                "companyName": "Keenthemes",
                "phone": "456669067890",
                "address": {
                    "addressLine": "L-12-20 Vertex, Cybersquare",
                    "city": "San Francisco",
                    "state": "California",
                    "postCode": "45000"
                },
                "socialNetworks": {
                    "linkedIn": "https://linkedin.com/admin",
                    "facebook": "https://facebook.com/admin",
                    "twitter": "https://twitter.com/admin",
                    "instagram": "https://instagram.com/admin"
                }
            },
            "config": {
                "url": "api/auth/login",
                "method": "get",
                "headers": {"Accept": "application/json, text/plain, */*", "Authorization": "Bearer "+this.Authorization.authToken+""},
                "auth": {"username": "admin", "password": "demo"},
                "transformRequest": [null],
                "transformResponse": [null],
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1,
                "maxBodyLength": -1
            },
            "request": {"responseURL": "api/auth/login"}
        }
        yield put(actions.fulfillUser(a));
    });
}
