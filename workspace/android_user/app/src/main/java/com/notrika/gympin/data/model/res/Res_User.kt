package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*


class Res_User {

    @SerializedName("Id")
    @Expose
     val Id: Int? = null

    @SerializedName("name")
    @Expose
     val name: String? = null

    @SerializedName("profileImage")
    @Expose
     val profileImage: String? = null

    @SerializedName("rate")
    @Expose
    val rate: Float? = null
}