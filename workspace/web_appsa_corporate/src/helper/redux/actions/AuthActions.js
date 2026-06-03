
export const authActionTypes = {
    SetUser: "[Auth] User",
    SetToken: "[Auth] Token",
    SetRefreshToken: "[Auth] Refresh Token",
    Logout: "[Auth] Logout"
};

export const authActions = {
    SetUser: (user) => ({ type: authActionTypes.SetUser, payload: { user } }),
    SetToken: (token) => ({ type: authActionTypes.SetToken, payload: { token } }),
    SetRefreshToken: (refreshToken) => ({ type: authActionTypes.SetRefreshToken, payload: { refreshToken } }),
    Logout: () => ({ type: authActionTypes.Logout })
};
