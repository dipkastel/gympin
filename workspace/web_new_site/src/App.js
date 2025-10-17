import {BrowserRouter} from "react-router-dom";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {GympinTheme} from "./helper/GympinTheme.js";
import {MainRoutes} from "./router/MainRoutes.js";
import {setupAxios} from "./network/setupAxios.js";
import axios from "axios";
import reportWebVitals from "./helper/reportWebVitals.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const { PUBLIC_URL } = process.env;




setupAxios(axios);
function App() {
  return (
      <BrowserRouter basename={PUBLIC_URL}>
        <MuiThemeProvider theme={GympinTheme}>
              <MainRoutes/>
        </MuiThemeProvider>
      </BrowserRouter>
  );
}

// const sendToAnalytics = ({ id, name, value }) => {
//     window.gtag('event', name, {
//         event_category: 'Web Vitals',
//         value: Math.round(name === 'CLS' ? value * 1000 : value),
//         event_label: id,
//         non_interaction: true,
//     });
// };

const sendToAnalytics = (metric) => {
    console.log(metric);
};

reportWebVitals(sendToAnalytics);

export default App;
