export const corporateActionTypes = {
    SetCorporate: "[Corporate] corporate "
};

export const corporateActions = {
    SetCorporate: (corporate) => ({ type: corporateActionTypes.SetCorporate, payload: { corporate } }),
};
