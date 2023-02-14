import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider as BootStrapThemeProvider} from "react-bootstrap"
import {GympinTheme} from "./GympinTheme"
import {MainRoutes} from "../router/MainRoutes";
import {BrowserRouter} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "../helper/style.css"
import {useState} from "react";
import Splash from "../pages/splash/Splash";
import GympinPagesProvider from "../components/GympinPagesProvider";

const { PUBLIC_URL } = process.env;

function App() {

    // const [connectionStatus, SetConnectionStatus] = useState(navigator.onLine);
    //
    // window.addEventListener('offline', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });
    // window.addEventListener('online', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });
    return (

        <BrowserRouter basename={PUBLIC_URL}>
            <MuiThemeProvider theme={GympinTheme}>
                <BootStrapThemeProvider dir="rtl">
                    <GympinPagesProvider>
                        <MainRoutes/>
                    </GympinPagesProvider>
                </BootStrapThemeProvider>
            </MuiThemeProvider>
        </BrowserRouter>
    )
}

export default App;
