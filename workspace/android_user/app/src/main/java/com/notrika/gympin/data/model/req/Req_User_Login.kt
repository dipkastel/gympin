package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_User_Login{

    constructor(_username:String,_password:String){
        this.username = _username;
        this.password = _password
    }

    @SerializedName("username")
    @Expose
    var username: String = ""

    @SerializedName("password")
    @Expose
    var password: String = ""



}
