import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider as BootStrapThemeProvider} from "react-bootstrap"
import {GympinTheme} from "../helper/GympinTheme"
import {MainRoutes} from "../router/MainRoutes";
import {BrowserRouter} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "../helper/style.css"
import {useState} from "react";
import GympinPagesProvider from "../components/GympinPagesProvider";
import ReactGA from "react-ga4";
import TagManager from 'react-gtm-module'

const { PUBLIC_URL } = process.env;
const gaTrackingId = "G-H7EHLB79L3";
const tagManagerArgs = "GTM-MBLL254T";
ReactGA.initialize(gaTrackingId);
TagManager.initialize(tagManagerArgs);

function App() {
    const [showSplash,SetShowSplash] = useState(true)
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
                            {/*{showSplash?<Splash onSplashComplete={()=>SetShowSplash(false)}/>:*/}
                            <GympinPagesProvider>
                                <MainRoutes/>
                            </GympinPagesProvider>
                            {/*}*/}
                        </BootStrapThemeProvider>
                    </MuiThemeProvider>
                </BrowserRouter>
    );
}

export default App;
