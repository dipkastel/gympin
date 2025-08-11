export const ActionTypesSaga = {
  RequestUser: "[Saga] Request User",
  RequestCatering: "[Saga] Request Catering",
  RequestServerSettings: "[Saga] Request Server Settings",
  RequestLogout: "[Saga] Request Logout",
};
export const sagaActions = {
  RequestUser: (user) => ({
    type: ActionTypesSaga.RequestUser,
    payload: { user },
  }),
  RequestCatering: (catering) => ({
    type: ActionTypesSaga.RequestCatering,
    payload: { catering },
  }),
  RequestServerSettings: (user) => ({
    type: ActionTypesSaga.RequestServerSettings,
    payload: { user },
  }),
  RequestLogout: () => ({ type: ActionTypesSaga.RequestLogout }),
};
