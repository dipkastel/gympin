import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider as BootStrapThemeProvider} from "react-bootstrap"
import {GympinTheme} from "./GympinTheme"
import {BrowserRouter} from "react-router-dom";
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "../helper/style.css"
import GympinPagesProvider from "../components/GympinPagesProvider";
import GNotification from "./notification";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CacheProvider} from "@emotion/react";
import {SwipeableDrawer, useColorScheme} from "@mui/material";
import PageLayout from "../components/PageLayout";
import ApplicationRoutes from "./ApplicationRoutes";

const {PUBLIC_URL} = process.env;

function App() {


    const isAuthorized = useSelector(({auth: {user}}) => user ? user.Id != null : false);


    // const [connectionStatus, SetConnectionStatus] = useState(navigator.onLine);
    //
    // window.addEventListener('offline', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });
    // window.addEventListener('online', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (

        <BrowserRouter basename={PUBLIC_URL}>
            <CacheProvider value={cacheRtl}>
                <MuiThemeProvider theme={GympinTheme}>
                    <BootStrapThemeProvider dir="rtl">
                        <GympinPagesProvider>
                            {isAuthorized &&
                            <GNotification/>
                            }
                            <ApplicationRoutes/>

                        </GympinPagesProvider>
                    </BootStrapThemeProvider>
                </MuiThemeProvider>
            </CacheProvider>
        </BrowserRouter>
    )
}

export default App;
