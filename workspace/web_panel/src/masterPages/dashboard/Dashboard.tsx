import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../../pages/home/Home";
import UserList from "../../pages/userList/UserList";
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import User from "../../pages/user/User";
import "./Dashboard.css"

export default function Dashboard({onLogout}:any){
    return (
        <Router>
            <Topbar onLogout={onLogout}/>
            <div className="main-container">
                <Sidebar/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/users">
                        <UserList/>
                    </Route>
                    <Route path="/user/:userId">
                        <User/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
