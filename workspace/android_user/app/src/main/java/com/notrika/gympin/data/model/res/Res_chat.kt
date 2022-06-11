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
    var userId: Int =0

    @SerializedName("text")
    @Expose
    var text: String? = null

    @SerializedName("date")
    @Expose
    var date: Date? = null
}
