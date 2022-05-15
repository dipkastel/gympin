package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_sport(id:Int) {

    @SerializedName("Id")
    @Expose
    var Id: Int? = id
    @SerializedName("Name")
    @Expose
    var name: String? = null
    @SerializedName("LaunchStatus")
    @Expose
    var LaunchStatus: String? = null
    @SerializedName("LogoIds")
    @Expose
    var LogoIds: List<Int> = ArrayList<Int>()
}
