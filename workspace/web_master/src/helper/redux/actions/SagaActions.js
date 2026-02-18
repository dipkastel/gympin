export const ActionTypesSaga = {
  RequestUser: "[Saga] Request User",
  RequestPlace: "[Saga] Request Place",
  RequestServerSettings: "[Saga] Request Server Settings",
  RequestLogout: "[Saga] Request Logout",
};
export const sagaActions = {
  RequestUser: (user) => ({
    type: ActionTypesSaga.RequestUser,
    payload: { user },
  }),
  RequestPlace: (place) => ({
    type: ActionTypesSaga.RequestPlace,
    payload: { place },
  }),
  RequestServerSettings: (user) => ({
    type: ActionTypesSaga.RequestServerSettings,
    payload: { user },
  }),
  RequestLogout: () => ({ type: ActionTypesSaga.RequestLogout }),
};

