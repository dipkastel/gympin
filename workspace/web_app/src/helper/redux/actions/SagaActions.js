export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestServerSettings: "[Saga] Request Server Settings"
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }})
};
