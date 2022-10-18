import {authActionTypes} from "./authActionTypes";

export const authActions = {
    login: (user) => ({ type: authActionTypes.Login, payload: { user } }),
    logout: () => ({ type: authActionTypes.Logout }),
    userLoaded: (user) => ({ type: authActionTypes.UserLoaded, payload: { user } }),
    SagaRequestUser: (user) => ({type: authActionTypes.SagaUserRequested,payload: { user }}),
};
