export const accessActionTypes = {
    SetAccess: "[Access] access "
};

export const accessActions = {
    SetAccess: (access) => ({ type: accessActionTypes.SetAccess, payload: { access } })
};
