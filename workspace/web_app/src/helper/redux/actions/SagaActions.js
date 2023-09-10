export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestServerSettings: "[Saga] Request Server Settings",
    RequestLogout: "[Saga] Request Logout"
};
export const sagaActions = {
    RequestUser: () => ({type: ActionTypesSaga.RequestUser}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }}),
    RequestLogout: () => ({type: ActionTypesSaga.RequestLogout})
};
