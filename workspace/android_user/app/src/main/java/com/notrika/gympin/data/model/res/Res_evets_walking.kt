package com.notrika.gympin.data.model.res

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.comon.Participant
import java.io.Serializable
import java.util.*

class Res_evets_walking: Res_base_evets() {



    @SerializedName("Address")
    @Expose
    val address: String? = null

    @SerializedName("EndLatitude")
    @Expose
    val endLatitude: Double? = null

    @SerializedName("EndLongitude")
    @Expose
    val endLongitude: Double? = null

    @SerializedName("StartLatitude")
    @Expose
    val startLatitude: Double? = null

    @SerializedName("StartLongitude")
    @Expose
    val startLongitude: Double? = null


    @SerializedName("ParticipantCount")
    @Expose
    val participantCount: Int? = null

    @SerializedName("Participants")
    @Expose
    var participants: List<Res_User>? = null



}
