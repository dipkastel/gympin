package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_User_Login{

    constructor(_phoneNumber:String,_code:String){
        this.phoneNumber = _phoneNumber;
        this.code = _code
    }

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String = ""

    @SerializedName("code")
    @Expose
    var code: String = ""



}
