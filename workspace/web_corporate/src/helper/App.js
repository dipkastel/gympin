
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider as BootStrapThemeProvider} from "react-bootstrap"
import {GympinTheme} from "../helper/GympinTheme"
import {MainRoutes} from "../router/MainRoutes";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "../helper/style.css"

function App({store, persistor, basename}) {
    // const [connectionStatus, SetConnectionStatus] = useState(navigator.onLine);
    //
    // window.addEventListener('offline', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });
    // window.addEventListener('online', (event) => {
    //     SetConnectionStatus(navigator.onLine)
    // });
    return (

        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter basename={basename}>
                    <MuiThemeProvider theme={GympinTheme}>
                        <BootStrapThemeProvider dir="rtl">
                            <MainRoutes/>
                        </BootStrapThemeProvider>
                    </MuiThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;