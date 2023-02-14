export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestCorporate: "[Saga] Request Corporate",
    RequestGates: "[Saga] Request Gates",
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }}),
    RequestCorporate: (corporate) => ({type: ActionTypesSaga.RequestCorporate,payload: { corporate }}),
    RequestGates: (placeId) => ({type: ActionTypesSaga.RequestGates,payload: { placeId }}),
};
