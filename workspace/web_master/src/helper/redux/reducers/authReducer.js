import {persistReducer} from "redux-persist";
import {authActionTypes} from "../actions/authActions";
import storage from "redux-persist/lib/storage";
import {forgotLastLocation} from "../../lastLocationHandler";


const initialAuthState = {
    user: undefined,
    token:undefined,
    refreshToken:undefined,
};

const ReducerConfig = {
    storage,
    key: "gympin-master-auth",
    whitelist:["user","token","refreshToken"]
};


const AuthBaseReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case authActionTypes.SetUser: {
            return {...state,user: action.payload.user };
        }
        case authActionTypes.SetToken: {
            return {...state,token: action.payload.token };
        }
        case authActionTypes.SetRefreshToken: {
            return {...state,refreshToken: action.payload.refreshToken };
        }
        case authActionTypes.Logout: {
            forgotLastLocation();
            return initialAuthState;
        }
        default:
            return state;
    }
}

export const authReducer = persistReducer(ReducerConfig,AuthBaseReducer);
