package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName




class Res_User_Role {


    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = false

    @SerializedName("Role")
    @Expose
    var role: String? = null
}
