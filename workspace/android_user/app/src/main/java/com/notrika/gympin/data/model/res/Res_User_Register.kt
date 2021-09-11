package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_User_Register {

    @SerializedName("initialText")
    @Expose
    var initialText: String = ""
    @SerializedName("Id")
    @Expose
    var id: Long = 0



}
