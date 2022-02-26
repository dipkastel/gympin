package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*

class Res_chat {

    @SerializedName("Id")
    @Expose
    val Id: Int =0

    @SerializedName("userId")
    @Expose
    val userId: Int =0

    @SerializedName("text")
    @Expose
    val text: String? = null

    @SerializedName("date")
    @Expose
    val date: Date? = null
}
