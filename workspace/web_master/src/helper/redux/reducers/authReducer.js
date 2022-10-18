import {persistReducer} from "redux-persist";
import {authActionTypes} from "../actions/authActionTypes";
import storage from "redux-persist/lib/storage";
import {forgotLastLocation} from "../../lastLocationHandler";


const initialAuthState = {
    user: undefined,
    userId: undefined,
    authToken: undefined,
    refreshToken: undefined,
    place:undefined,
};

const authConfig = {
    storage,
    key: "gympin-master-auth",
    whitelist: ["user","userId", "authToken","refreshToken","place"]
};

const baseReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case authActionTypes.Login: {
            console.log("action login");
            return {...state,
                authToken:action.payload.user.Token ,
                refreshToken:action.payload.user.RefreshToken ,
                userId:action.payload.user.Id,
                user: action.payload.user };
        }

        case authActionTypes.Logout: {
            console.log("action Logout");
            forgotLastLocation();
            return initialAuthState;
        }

        case authActionTypes.UserLoaded: {
            console.log("action UserLoaded");
            const { user } = action.payload;
            return { ...state, user };
        }

        case authActionTypes.userPlaceSelected: {
            console.log("action UserPlaceSelected");
            const { place } = action.payload;
            return { ...state, place };
        }

        default:
            return state;
    }
}

export const authReducer = persistReducer(authConfig,baseReducer);
