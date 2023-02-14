export const placeActionTypes = {
    SetPlace: "[Place] place ",
    SetGates: "[Place] gates",
};

export const placeActions = {
    SetPlace: (place) => ({ type: placeActionTypes.SetPlace, payload: { place } }),
    SetGates: (gates) => ({ type: placeActionTypes.SetGates, payload: { gates } })
};
