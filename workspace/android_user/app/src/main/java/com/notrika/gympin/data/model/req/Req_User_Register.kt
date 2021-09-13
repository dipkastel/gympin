package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_User_Register{

    constructor(_phoneNumber:String,_userName:String){
        this.phoneNumber = _phoneNumber;
        this.username = _userName
    }

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String = ""

    @SerializedName("username")
    @Expose
    var username: String = ""



}
