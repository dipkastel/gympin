export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestPlace: "[Saga] Request Place",
    RequestAccess: "[Saga] Request Access",
    RequestGates: "[Saga] Request Gates",
    RequestServerSettings: "[Saga] Request Server Settings"
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }}),
    RequestPlace: (placeId) => ({type: ActionTypesSaga.RequestPlace,payload: { placeId }}),
    RequestAccess: (userId,placeId) => ({type: ActionTypesSaga.RequestAccess,payload: { userId,placeId }}),
    RequestGates: (placeId) => ({type: ActionTypesSaga.RequestGates,payload: { placeId }}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }})
};
