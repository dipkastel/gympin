import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cateringActionTypes } from "../actions/CateringActions";

const initialPlaceState = {
  catering: undefined,
};

const ReducerConfig = {
  storage,
  key: "gympin-catering-catering",
  whitelist: ["catering"],
};

const Reducer = (state = initialPlaceState, action) => {
  switch (action.type) {
    case cateringActionTypes.SetCatering: {
      return { ...state, catering: action.payload.catering };
    }
    default:
      return state;
  }
};

export const cateringReducer = persistReducer(ReducerConfig, Reducer);
