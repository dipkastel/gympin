export const placeActionTypes = {
  SetPlace: "[Place] place ",
};

export const placeActions = {
  SetPlace: (place) => ({
    type: placeActionTypes.SetPlace,
    payload: { place },
  }),
};
