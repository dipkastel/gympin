package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose

import com.google.gson.annotations.SerializedName




class Res_place {

    @SerializedName("Address")
    @Expose
    var address: String? = null

    @SerializedName("CreatedDate")
    @Expose
    var createdDate: String? = null

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("IsDeleted")
    @Expose
    var isDeleted: Boolean? = null

    @SerializedName("Latitude")
    @Expose
    var latitude: Double? = null

    @SerializedName("Longitude")
    @Expose
    var longitude: Double? = null

    @SerializedName("Name")
    @Expose
    var name: String? = null

    @SerializedName("Region")
    @Expose
    var region: Res_regen? = null

    @SerializedName("UpdatedDate")
    @Expose
    var updatedDate: String? = null
}
