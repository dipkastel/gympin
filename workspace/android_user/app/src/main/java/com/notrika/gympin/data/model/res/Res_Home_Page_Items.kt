package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.entity.Home_Item

class Res_Home_Page_Items : Home_Item {

    @SerializedName("ImageUrl")
    @Expose
     val imageUrl: String? = null

    @SerializedName("Title")
    @Expose
     val title: String? = null

    @SerializedName("Description")
    @Expose
     val description: String? = null

    @SerializedName("Destination")
    @Expose
    val destination: String? = null

    @SerializedName("Data")
    @Expose
    val data: String = ""

    @SerializedName("Priority")
    @Expose
    val priority: Int? = null
}
