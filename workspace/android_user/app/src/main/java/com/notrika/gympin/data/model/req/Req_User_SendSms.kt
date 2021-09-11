package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_User_SendSms{

    constructor(_phoneNumber:String){
        this.phoneNumber = _phoneNumber;
    }

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String = ""



}
