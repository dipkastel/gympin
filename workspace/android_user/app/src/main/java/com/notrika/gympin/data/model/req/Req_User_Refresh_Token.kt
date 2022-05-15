package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_User_Refresh_Token {

    @SerializedName("RefreshToken")
    @Expose
    var refreshToken: String = ""

}
