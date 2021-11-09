package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_sport {

    @SerializedName("Name")
    @Expose
    var name: String? = null
    @SerializedName("Status")
    @Expose
    var status: String? = null
    @SerializedName("MainImage")
    @Expose
    var mainImage: String? = null
}
