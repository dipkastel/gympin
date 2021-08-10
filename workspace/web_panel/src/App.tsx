import React, {useState} from 'react';

import Dashboard from "./masterPages/dashboard/Dashboard";
import Login from "./masterPages/login/Login";
import {UserModel} from "./models/UserModel";
import Pocket from "./helpers/pocket/Pocket";


function App() {
    const [user,setUser] = useState(new UserModel(Pocket.getInstance().getToken()))
    var onLogin=(data:any)=>{
                setUser(new UserModel(data.Data.token));
                Pocket.getInstance().setToken(data.Data.token);
    }
    var onLogout=()=>{
                setUser(new UserModel(""));
                Pocket.getInstance().setToken("");
    }
    return (user.token==="")?<Login onLogin={onLogin}/>:<Dashboard onLogout={onLogout}/>;
}
export default App;
