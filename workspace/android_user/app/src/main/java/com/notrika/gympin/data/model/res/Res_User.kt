package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*


class Res_User {

    @SerializedName("Id")
    @Expose
     val id: Long = 0

    @SerializedName("Name")
    @Expose
    var name: String? = null

    @SerializedName("ProfileImage")
    @Expose
    var profileImage: String? = null

    @SerializedName("Bio")
    @Expose
    var bio: String? = null


    @SerializedName("FollowersCount")
    @Expose
    var followersCount: Long? = null

    @SerializedName("FollowingsCount")
    @Expose
    var followingsCount: Long? = null

    @SerializedName("Rate")
    @Expose
    var rate: Float? = null

    @SerializedName("UserRole")
    @Expose
    var userRole: List<Res_User_Role>? = null

    @SerializedName("UserStatus")
    @Expose
    var userStatus: String? = null

    @SerializedName("Username")
    @Expose
    var username: String? = null

    @SerializedName("LastName")
    @Expose
    var lastName: String? = null

    @SerializedName("Email")
    @Expose
    var email: String? = null

    @SerializedName("NationalCode")
    @Expose
    var nationalCode: String? = null

    @SerializedName("Birthday")
    @Expose
    var birthday: String? = null

    @SerializedName("PhoneNumber")
    @Expose
    var phoneNumber: String? = null

    @SerializedName("UserGroup")
    @Expose
    var userGroup: String? = null

    @SerializedName("Token")
    @Expose
    var token: String? = null

    @SerializedName("AvatarId")
    @Expose
    var AvatarId: Long? = null

}
