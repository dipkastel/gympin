package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*

class Res_market {


    @SerializedName("Id")
    @Expose
    val Id: Int? = null

    @SerializedName("title")
    @Expose
    val title: String? = null

    @SerializedName("description")
    @Expose
    val description: String? = null

    @SerializedName("image")
    @Expose
    val image: String? = null

    @SerializedName("price")
    @Expose
    val price: Int? = null

    @SerializedName("coin")
    @Expose
    val coin: Int? = null

    @SerializedName("expiredate")
    @Expose
    val expiredate: Date? = null

}
