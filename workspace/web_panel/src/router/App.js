import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { LastLocationProvider } from "react-router-last-location";
import { Routes } from "./Routes";
import { I18nProvider, LayoutSplashScreen } from "../helper";
import { NThemeSite } from "../components/NThemeSite";
import { ThemeProvider } from "@mui/material/styles";

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        <React.Suspense fallback={<LayoutSplashScreen />}>
          <BrowserRouter basename={basename}>
            <LastLocationProvider>
              <ThemeProvider theme={NThemeSite}>
                <I18nProvider>
                  <Routes />
                </I18nProvider>
              </ThemeProvider>
            </LastLocationProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
