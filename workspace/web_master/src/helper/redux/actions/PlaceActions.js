export const placeActionTypes = {
    SetPlace: "[Place] place ",
    SetHalls: "[Place] halls",
};

export const placeActions = {
    SetPlace: (place) => ({ type: placeActionTypes.SetPlace, payload: { place } }),
    SetHalls: (halls) => ({ type: placeActionTypes.SetHalls, payload: { halls: halls } })
};
