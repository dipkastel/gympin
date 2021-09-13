package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_User_Login {

    @SerializedName("role")
    @Expose
    var role: String? = null

    @SerializedName("username")
    @Expose
    var username: String? = null

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String? = null

    @SerializedName("token")
    @Expose
    var token: String? = null

    @SerializedName("password")
    @Expose
    var password: String? = null

    @SerializedName("enabled")
    @Expose
    var enabled: Boolean? = null

    @SerializedName("credentialsNonExpired")
    @Expose
    var credentialsNonExpired: Boolean? = null

    @SerializedName("accountNonExpired")
    @Expose
    var accountNonExpired: Boolean? = null

    @SerializedName("accountNonLocked")
    @Expose
    var accountNonLocked: Boolean? = null

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
