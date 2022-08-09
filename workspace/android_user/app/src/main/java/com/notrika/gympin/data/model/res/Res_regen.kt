package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName




class Res_regen {


    @SerializedName("City")
    @Expose
    var city: Res_city? = null

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null

    @SerializedName("Name")
    @Expose
    var name: String? = null

}
