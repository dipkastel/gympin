import {authActionTypes, authActionTypesSaga} from "./authActionTypes";

export const authActions = {
    login: (user) => ({ type: authActionTypes.Login, payload: { user } }),
    logout: () => ({ type: authActionTypes.Logout }),
    userLoaded: (user) => ({ type: authActionTypes.UserLoaded, payload: { user } }),
    userPlaceSelected: (place) => ({ type: authActionTypes.userPlaceSelected, payload: { place } }),
};

export const authActionsSaga = {
    sagaRequestUser: (user) => ({type: authActionTypesSaga.SagaUserRequested,payload: { user }}),
};
