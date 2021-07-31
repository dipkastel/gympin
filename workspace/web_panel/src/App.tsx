import React from 'react';

import Dashboard from "./masterPages/dashboard/Dashboard";
import Login from "./masterPages/login/Login";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";



function App() {

    return (
        <Router>
            {false ? <Redirect to="/login" /> :<Dashboard/>}
            <Route exact path="/login">
                <Login/>
            </Route>
        </Router>
    );
}
export default App;
