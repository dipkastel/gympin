package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_User_Login {

    @SerializedName("userRole")
    @Expose
    var userRole: String? = null

    @SerializedName("userStatus")
    @Expose
    var userStatus: String? = null

    @SerializedName("username")
    @Expose
    var username: String? = null

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String? = null

    @SerializedName("token")
    @Expose
    var token: String? = null

    @SerializedName("name")
    @Expose
    var name: String? = null

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("CreatedDate")
    @Expose
    var createdDate: Any? = null

    @SerializedName("UpdatedDate")
    @Expose
    var updatedDate: Any? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null


}
