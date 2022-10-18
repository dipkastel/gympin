import {persistReducer} from "redux-persist";
import {authActionTypes} from "../actions/authActionTypes";
import storage from "redux-persist/lib/storage";
import {forgotLastLocation} from "../../lastLocationHandler";


const initialAuthState = {
    user: undefined,
    userId: undefined,
    authToken: undefined,
    refreshToken: undefined,
};

const authConfig = {
    storage, key: "gympin-webapp-auth",
    whitelist: ["user", "authToken"]
};

const baseReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case authActionTypes.Login: {
            console.log("action login");
            return { authToken:action.payload.user.Token ,refreshToken:action.payload.user.RefreshToken ,userId:action.payload.user.id, user: action.payload.user };
        }

        case authActionTypes.Logout: {
            console.log("action Logout");
            forgotLastLocation();
            return initialAuthState;
        }

        case authActionTypes.Register: {
            console.log("action Register");
            const { authToken } = action.payload.Token;
            return { authToken, user: undefined };
        }

        case authActionTypes.UserLoaded: {
            console.log("action UserLoaded");
            const { user } = action.payload;
            return { ...state, user };
        }

        default:
            return state;
    }
}

export const authReducer = persistReducer(authConfig,baseReducer);