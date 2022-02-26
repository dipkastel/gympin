package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*

class Res_content {

    @SerializedName("Id")
    @Expose
    var Id: Int? = null
    @SerializedName("title")
    @Expose
    var title: String? = null
    @SerializedName("description")
    @Expose
    var description: String? = null
    @SerializedName("Image")
    @Expose
    var image: String? = null
    @SerializedName("date")
    @Expose
    val date: Date? = null
    @SerializedName("User")
    @Expose
    var user: Res_User? = null

}
