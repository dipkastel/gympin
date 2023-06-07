export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestServerSettings: "[Saga] Request Server Settings",
    RequestLogout: "[Saga] Request Logout"
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }}),
    RequestLogout: () => ({type: ActionTypesSaga.RequestLogout})
};
