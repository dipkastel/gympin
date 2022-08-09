package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName




class Res_city {

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null

    @SerializedName("Name")
    @Expose
    var name: String? = null

    @SerializedName("State")
    @Expose
    var state: Res_state? = null
}
