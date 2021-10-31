package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_Home_Page_Items {
    @SerializedName("type")
    @Expose
    private val type: String? = null

    @SerializedName("imageUrl")
    @Expose
    private val imageUrl: String? = null

    @SerializedName("title")
    @Expose
    private val title: String? = null

    @SerializedName("description")
    @Expose
    private val description: String? = null

    @SerializedName("destination")
    @Expose
    private val destination: String? = null

    @SerializedName("priority")
    @Expose
    private val priority: Int? = null
}
