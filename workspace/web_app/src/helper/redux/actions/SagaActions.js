export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User"
};
export const sagaActions = {
    RequestUser: (user) => ({type: ActionTypesSaga.RequestUser,payload: { user }})
};
