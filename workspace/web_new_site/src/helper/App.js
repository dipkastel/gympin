import {BrowserRouter} from "react-router-dom";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {GympinTheme} from "./GympinTheme";
import {MainRoutes} from "../router/MainRoutes";
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from "stylis";
import createCache from '@emotion/cache';

const { PUBLIC_URL } = process.env;




function App() {
  return (
      <BrowserRouter basename={PUBLIC_URL}>
        <MuiThemeProvider theme={GympinTheme}>
              <MainRoutes/>
        </MuiThemeProvider>
      </BrowserRouter>
  );
}

export default App;
