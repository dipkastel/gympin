package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_Refresh_Token {

    @SerializedName("Token")
    @Expose
    var token: String = ""
    @SerializedName("RefreshToken")
    @Expose
    var refreshToken: String = ""
}
