package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_Home_Page {

    @SerializedName("type")
    @Expose
    private val type: String? = null

    @SerializedName("priority")
    @Expose
    private val priority: Int? = null

    @SerializedName("items")
    @Expose
    private val items: List<Res_Home_Page_Items>? = null

}