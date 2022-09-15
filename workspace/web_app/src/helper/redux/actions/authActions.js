import {authActionTypes} from "./authActionTypes";

export const authActions = {
    login: (user) => ({ type: authActionTypes.Login, payload: { user } }),
    logout: () => ({ type: authActionTypes.Logout }),
    requestUser: (user) => ({type: authActionTypes.UserRequested,payload: { user }}),
    fulfillUser: (user) => ({ type: authActionTypes.UserLoaded, payload: { user } }),
};
