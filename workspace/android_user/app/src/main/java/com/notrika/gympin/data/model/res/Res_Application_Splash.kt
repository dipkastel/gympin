package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_Application_Splash {

    @SerializedName("initialText")
    @Expose
    var initialText: String = ""
    @SerializedName("Id")
    @Expose
    var id: Long = 0



}
