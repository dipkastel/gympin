import React from 'react';
import "./Login.css"
import {Button,TextField,Checkbox} from '@material-ui/core';

export default function Login({onLogin}:any){
    const onSubmit = (e:any) =>{
        e.preventDefault();
        onLogin(e.target);
    }
    return (
        <div className="login" >
            <div className="card slide-fwd-center">
                <form className="form" onSubmit={onSubmit}>
                    <div className="title">login : </div>
                    <div className="form-control">
                        <TextField id="standard-basic" label="username"  name="username"/>
                    </div>
                    <div className="form-control">
                        <TextField id="standard-basic" type="password" label="password" name="password" />
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
