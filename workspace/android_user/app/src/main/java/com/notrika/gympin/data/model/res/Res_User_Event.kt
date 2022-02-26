package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*


class Res_User_Event {

    @SerializedName("Id")
    @Expose
     val Id: Int? = null

    @SerializedName("name")
    @Expose
     val name: String? = null

    @SerializedName("description")
    @Expose
     val description: String? = null

    @SerializedName("date")
    @Expose
     val date: Date? = null

    @SerializedName("address")
    @Expose
    val address: String? = null


    @SerializedName("creator")
    @Expose
     val creator: Res_User? = null

    @SerializedName("contributors")
    @Expose
     val contributors: List<Res_User>? = null

}