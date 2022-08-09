package com.notrika.gympin.data.model.entity

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable

class mock_place:Serializable  {

    @SerializedName("id")
    @Expose
    var id: Long? = null

    @SerializedName("name")
    @Expose
    var name: String? = null

    @SerializedName("plan")
    @Expose
    var plan: Long? = null

    @SerializedName("address")
    @Expose
    var address: String? = null

    @SerializedName("workDays")
    @Expose
    var workDays: String? = null

    @SerializedName("shiftTime")
    @Expose
    var shiftTime: String? = null

    @SerializedName("gender")
    @Expose
    var gender: String? = null

    @SerializedName("image")
    @Expose
    var image: String? = null

    @SerializedName("facilities")
    @Expose
    var facilities: List<Int>? = null

    @SerializedName("sports")
    @Expose
    var sports: List<String>? = null

}
