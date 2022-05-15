package com.notrika.gympin.data.model.comon

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.res.Res_User_Role

class Participant {

    @SerializedName("userRole")
    @Expose
    var userRole: List<Res_User_Role>? = null

    @SerializedName("userStatus")
    @Expose
    var userStatus: String? = null

    @SerializedName("username")
    @Expose
    var username: String? = null

    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: String? = null

    @SerializedName("name")
    @Expose
    var name: String? = null

    @SerializedName("ProfileImage")
    @Expose
    var profileImage: String? = null

    @SerializedName("Id")
    @Expose
    var id: Int = 0
    @SerializedName("Rate")
    @Expose
    var rate: Float = 0.0f
}
