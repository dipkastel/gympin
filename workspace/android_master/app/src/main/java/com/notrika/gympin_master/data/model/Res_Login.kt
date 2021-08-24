package com.notrika.gympin_master.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_Login {

    @SerializedName("Id")
    @Expose
    var id: Long = 0

    @SerializedName("role")
    @Expose
    var role: String = ""

    @SerializedName("username")
    @Expose
    var username: String = ""

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String = ""

    @SerializedName("token")
    @Expose
    var token: String = ""




}
