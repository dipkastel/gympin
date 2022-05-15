package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.comon.Participant
import java.io.Serializable
import java.util.*

abstract class Res_base_evets:Serializable {


    @SerializedName("Id")
    @Expose
    val id: Long = 0

    @SerializedName("Description")
    @Expose
    val description: String? = null

    @SerializedName("Title")
    @Expose
    val title: String? = null


    @SerializedName("Sport")
    @Expose
    var sport: Res_sport? = null

    @SerializedName("Owner")
    @Expose
    var owner: Res_User? = null

    @SerializedName("StartDate")
    @Expose
    var startDate: Date? = null
}
