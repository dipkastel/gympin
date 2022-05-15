package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_add_participent {

    @SerializedName("Id")
    @Expose
    var id: Long? = null

    @SerializedName("Event")
    @Expose
    var event: Res_evets_walking? = null

    @SerializedName("User")
    @Expose
    var user: Res_User? = null
}
