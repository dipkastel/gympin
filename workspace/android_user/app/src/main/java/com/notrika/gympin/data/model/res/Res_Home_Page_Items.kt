package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.entity.Home_Item

class Res_Home_Page_Items : Home_Item {
    @SerializedName("type")
    @Expose
     val type: String? = null

    @SerializedName("imageUrl")
    @Expose
     val imageUrl: String? = null

    @SerializedName("title")
    @Expose
     val title: String? = null

    @SerializedName("description")
    @Expose
     val description: String? = null

    @SerializedName("destination")
    @Expose
    val destination: String? = null

    @SerializedName("data")
    @Expose
    val data: String = ""

    @SerializedName("priority")
    @Expose
    val priority: Int? = null
}
