import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider as BootStrapThemeProvider} from "react-bootstrap"
import {GympinTheme} from "./GympinTheme"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "../helper/style/style.css"
import GympinPagesProvider from "../components/GympinPagesProvider";
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {NavigationMenu} from "./NavigationMenu";
import * as React from 'react';
import {ReactRouterAppProvider} from '@toolpad/core/react-router';
import {Outlet} from 'react-router';
import {useSelector} from "react-redux";
import NewLogin from "../pages/auth/NewLogin";
import {useEffect} from "react";
import {getSelectedTheme} from "./pocket";
import {useColorScheme} from "@mui/material";


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});



function App(props) {

    const isAuthorized = useSelector(({auth: {token}}) => token != null);

    const {mode} = useColorScheme();
    useEffect(() => {
        console.log("GympinTheme",GympinTheme.colorSchemes.light)
    }, [mode]);



    function CheckAuth() {
       return(isAuthorized)?
        <ReactRouterAppProvider
            navigation={NavigationMenu}
                                theme={mode==='light'?GympinTheme.colorSchemes.light:GympinTheme.colorSchemes.dark}
                                branding={{
                                    logo: <img src="/logo192.png" alt="MUI logo"/>,
                                    title: 'جیم پین',
                                    homeUrl: '/dashboard',
                                }}

        >
            <Outlet/>
        </ReactRouterAppProvider>:<NewLogin />
    }

    return (

            <CacheProvider value={cacheRtl}>
                <MuiThemeProvider theme={GympinTheme}>
                    <BootStrapThemeProvider dir="rtl">
                        <GympinPagesProvider>
                            <CheckAuth/>
                        </GympinPagesProvider>
                    </BootStrapThemeProvider>
                </MuiThemeProvider>
            </CacheProvider>

    );
}
export default App;
