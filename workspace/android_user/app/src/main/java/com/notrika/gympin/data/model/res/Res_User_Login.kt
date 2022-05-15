package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_User_Login {

    @SerializedName("UserRole")
    @Expose
    var userRole: String? = null

    @SerializedName("UserStatus")
    @Expose
    var userStatus: String? = null

    @SerializedName("Username")
    @Expose
    var username: String? = null

    @SerializedName("PhoneNumber")
    @Expose
    var phoneNumber: String? = null

    @SerializedName("Token")
    @Expose
    var token: String? = null

    @SerializedName("RefreshToken")
    @Expose
    var refreshToken: String = ""

    @SerializedName("Name")
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
