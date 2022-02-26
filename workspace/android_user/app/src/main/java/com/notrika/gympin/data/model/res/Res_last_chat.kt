package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_last_chat {


    @SerializedName("type")
    @Expose
    val type: String? = null

    @SerializedName("user")
    @Expose
    val users: Res_User? = null

    @SerializedName("lastChats")
    @Expose
    val lastChats: List<Res_chat>? = null
}
