package com.notrika.gympin_master.data.model.Res

import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName




class Res_UserPlace {

    @SerializedName("Id")
    @Expose
    var id: Int? = null

    @SerializedName("CreatedDate")
    @Expose
    var createdDate: Any? = null

    @SerializedName("UpdatedDate")
    @Expose
    var updatedDate: Any? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null

    @SerializedName("Name")
    @Expose
    var name: String? = null

    @SerializedName("Latitude")
    @Expose
    var latitude: Double? = null

    @SerializedName("Longitude")
    @Expose
    var longitude: Double? = null

    @SerializedName("Address")
    @Expose
    var address: String? = null
}
