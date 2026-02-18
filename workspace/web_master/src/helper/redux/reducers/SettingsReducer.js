import { persistReducer } from "redux-persist";
import { settingsActionTypes } from "../actions/SettingsActions";
import storage from "redux-persist/lib/storage";

const initialSettingsState = {
  server: undefined,
  app: undefined,
};

const ReducerConfig = {
  storage,
  key: "gympin-pwa-place-setting",
  whitelist: ["server", "app"],
};



const SettingsReducer = (state = initialSettingsState, action) => {
  switch (action.type) {
    case settingsActionTypes.SetServerSettings: {
      return { ...state, server: action.payload.settings };
    }
    case settingsActionTypes.SetAppSettings: {
      return { ...state, app: action.payload.settings };
    }
    default:
      return state;
  }
};

export const settingsReducer = persistReducer(ReducerConfig, SettingsReducer);
