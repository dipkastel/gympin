package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_map_data {
    @SerializedName("place_id")
    @Expose
    var placeId: Int? = null

    @SerializedName("licence")
    @Expose
    var licence: String? = null

    @SerializedName("osm_type")
    @Expose
    var osmType: String? = null

    @SerializedName("osm_id")
    @Expose
    var osmId: Long? = null

    @SerializedName("lat")
    @Expose
    var lat: String? = null

    @SerializedName("lon")
    @Expose
    var lon: String? = null

    @SerializedName("display_name")
    @Expose
    var displayName: String? = null

    @SerializedName("address")
    @Expose
    var address: Res_map_address? = null

    @SerializedName("boundingbox")
    @Expose
    var boundingbox: List<String>? = null
}
