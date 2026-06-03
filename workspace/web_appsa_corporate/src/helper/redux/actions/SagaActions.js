export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestCorporate: "[Saga] Request Corporate",
    RequestGates: "[Saga] Request Gates",
    RequestServerSettings: "[Saga] Request Server Settings",
    RequestLogout: "[Saga] Request Logout"
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }}),
    RequestCorporate: (corporate) => ({type: ActionTypesSaga.RequestCorporate,payload: { corporate }}),
    RequestGates: (placeId) => ({type: ActionTypesSaga.RequestGates,payload: { placeId }}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }}),
    RequestLogout: () => ({type: ActionTypesSaga.RequestLogout})
};
