import {ThemeProvider} from "@mui/material/styles";
import {GympinTheme} from "../helper/GympinTheme"
import {MainRoutes} from "../router/MainRoutes";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

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
                    <ThemeProvider theme={GympinTheme}>
                        <MainRoutes/>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
