package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class Res_map_address {

    @SerializedName("road")
    @Expose
    var road: String? = null

    @SerializedName("village")
    @Expose
    var village: String? = null

    @SerializedName("city")
    @Expose
    var city: String? = null

    @SerializedName("district")
    @Expose
    var district: String? = null

    @SerializedName("county")
    @Expose
    var county: String? = null

    @SerializedName("state")
    @Expose
    var state: String? = null

    @SerializedName("ISO3166-2-lvl4")
    @Expose
    var iSO31662Lvl4: String? = null

    @SerializedName("postcode")
    @Expose
    var postcode: String? = null

    @SerializedName("country")
    @Expose
    var country: String? = null

    @SerializedName("country_code")
    @Expose
    var countryCode: String? = null

    @SerializedName("neighbourhood")
    @Expose
    var neighbourhood: String? = null

    @SerializedName("suburb")
    @Expose
    var suburb: String? = null

    @SerializedName("province")
    @Expose
    var province: String? = null


}
