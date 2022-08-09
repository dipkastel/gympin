package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.util.*


class Res_User_Login {



    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null

    @SerializedName("CreatedDate")
    @Expose
    var createdDate: Date? = null

    @SerializedName("UpdatedDate")
    @Expose
    var updatedDate: Date? = null

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

    @SerializedName("LastName")
    @Expose
    var lastName: String? = null

    @SerializedName("FollowersCount")
    @Expose
    var followersCount: Long? = null

    @SerializedName("FollowingsCount")
    @Expose
    var followingsCount: Long? = null

    @SerializedName("Bio")
    @Expose
    var bio: String? = null

    @SerializedName("Rate")
    @Expose
    var rate: Float? = 0.0f

    @SerializedName("Birthday")
    @Expose
    var birthday: Date? = null

    @SerializedName("NationalCode")
    @Expose
    var nationalCode: String? = null

    @SerializedName("Email")
    @Expose
    var email: String? = null

    @SerializedName("UserGroup")
    @Expose
    var userGroup: String? = null

    @SerializedName("AvatarId")
    @Expose
    var avatarId: Long? = null

    @SerializedName("UserRole")
    @Expose
    var userRole: List<Res_User_Role>? = null



}
