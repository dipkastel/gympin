import React, {useState} from 'react';
import "./Login.css"
import {Button,TextField,Checkbox} from '@material-ui/core';
import accountApi from "../../helpers/axios/accountApi";

export default function Login({onLogin}:any){

    const [Error,setError] = useState(null)
    const onSubmit =async (e:any) =>{
        e.preventDefault();
       await accountApi.LoginPanel(e.target.username.value,e.target.password.value).then(res=>{
           if(res.data.Success){
               setError(null);
               onLogin(res.data);
           }else{
               setError(null);
           }

       }).catch(err=>{
           console.log(err);
           setError(err);
        });
    }
    return (
        <div className="login" >
            <div className="card slide-fwd-center">
                <form className="form" onSubmit={onSubmit}>
                    <div className="title">login : </div>
                    <div className="form-control">
                        <TextField id="standard-basic" label="username"  name="username" error={Error!==null}/>
                    </div>
                    <div className="form-control">
                        <TextField id="standard-basic" type="password" label="password" name="password" error={Error!==null} />
                    </div>
                    <Checkbox
                        value="remember"
                        name="remember"
                        inputProps={{ 'aria-label': 'remember me' }}
                    />Rember me
                    <div className="form-control">
                        <Button variant="outlined" type="submit">submit</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
