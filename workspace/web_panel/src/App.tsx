import React, {useState} from 'react';

import Dashboard from "./masterPages/dashboard/Dashboard";
import Login from "./masterPages/login/Login";
import {UserModel} from "./models/UserModel";


function App() {
    const [user,setUserToken] = useState(new UserModel())
    var onLogin=(data:any)=>{
        var newuser = new UserModel();
        console.log(data.username.value);
        newuser.token = data.username.value;
        setUserToken(newuser)
    }
    return (user.token==="")?<Login onLogin={onLogin}/>:<Dashboard/>;
}
export default App;
