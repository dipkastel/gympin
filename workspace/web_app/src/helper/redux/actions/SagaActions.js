export const ActionTypesSaga = {
    RequestUser: "[Saga] Request User",
    RequestServerSettings: "[Saga] Request Server Settings",
    RequestUserInvoices: "[Saga] Request User Invoices",
    RequestLogout: "[Saga] Request Logout"
};
export const sagaActions = {
    RequestUser: () => ({type: ActionTypesSaga.RequestUser}),
    RequestServerSettings: (user) => ({type: ActionTypesSaga.RequestServerSettings,payload: { user }}),
    RequestUserInvoices: (user) => ({type: ActionTypesSaga.RequestUserInvoices,payload: { user }}),
    RequestLogout: () => ({type: ActionTypesSaga.RequestLogout})
};
