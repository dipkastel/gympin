export const cateringActionTypes = {
  SetCatering: "[Catering] catering ",
};

export const cateringActions = {
  SetCatering: (catering) => ({
    type: cateringActionTypes.SetCatering,
    payload: { catering },
  }),
};
