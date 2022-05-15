package com.notrika.gympin.data.model.res

import com.google.gson.annotations.SerializedName

class Res_my_events {
    @SerializedName("OwnedEvents")
    var ownedEvents :List<Res_evets_walking>? = null

    @SerializedName("ParticipatedEvents")
    var ParticipatedEvents :List<Res_evets_walking>? = null
}
