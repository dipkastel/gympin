package com.notrika.gympin.data.model.entity

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class mock_ticket {

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("name")
    @Expose
    var name: String? = null

    @SerializedName("place_name")
    @Expose
    var place_name: String? = null

    @SerializedName("description")
    @Expose
    var description: String? = null

    @SerializedName("price")
    @Expose
    var price: Long? = null

    @SerializedName("income_count")
    @Expose
    var income_count: Int? = null

    @SerializedName("user_income")
    @Expose
    var user_income: Int? = null

    @SerializedName("status")
    @Expose
    var status: String? = null

    @SerializedName("code")
    @Expose
    var code: String? = null

    @SerializedName("expire")
    @Expose
    var expire: String? = null
}
