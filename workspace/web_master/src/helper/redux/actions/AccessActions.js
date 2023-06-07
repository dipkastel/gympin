export const accessActionTypes = {
    SetAccess: "[Access] set access "
};

export const accessActions = {
    SetAccess: (access) => ({ type: accessActionTypes.SetAccess, payload: { access } })
};
