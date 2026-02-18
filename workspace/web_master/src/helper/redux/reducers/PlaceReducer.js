import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { placeActionTypes } from "../actions/PlaceActions";

const initialPlaceState = {
  place: undefined,
};

const ReducerConfig = {
  storage,
  key: "gympin-place-place",
  whitelist: ["place"],
};



const Reducer = (state = initialPlaceState, action) => {
  switch (action.type) {
    case placeActionTypes.SetPlace: {
      return { ...state, place: action.payload.place };
    }
    default:
      return state;
  }
};

export const placeReducer = persistReducer(ReducerConfig, Reducer);
