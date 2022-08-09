package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_plan {

    @SerializedName("Id")
    @Expose
    var Id: Int? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = false

    @SerializedName("name")
    @Expose
    val name: String? = null
}
