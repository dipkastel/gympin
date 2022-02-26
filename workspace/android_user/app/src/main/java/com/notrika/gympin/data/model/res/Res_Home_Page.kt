package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.entity.Home_Item


class Res_Home_Page:Home_Item {

    @SerializedName("type")
    @Expose
     val type: String? = null

    @SerializedName("priority")
    @Expose
     val priority: Int? = null

    @SerializedName("items")
    @Expose
     val items: List<Res_Home_Page_Items>? = null

}