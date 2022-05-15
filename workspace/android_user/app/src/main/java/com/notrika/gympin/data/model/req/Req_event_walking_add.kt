package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.comon.Participant
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import org.threeten.bp.LocalDate
import java.util.*

class Req_event_walking_add {

    @SerializedName("Description")
    @Expose
    var description: String? = null

    @SerializedName("Title")
    @Expose
    var title: String? = null

    @SerializedName("Address")
    @Expose
    var address: String? = null

    @SerializedName("StartLatitude")
    @Expose
    var startLatitude: Double? = null

    @SerializedName("StartLongitude")
    @Expose
    var startLongitude: Double? = null

    @SerializedName("ParticipantCount")
    @Expose
    var participantCount: Int? = null

    @SerializedName("Participants")
    @Expose
    var participants: List<Res_User> = arrayListOf()

    @SerializedName("Sport")
    @Expose
    var sport: Res_sport? = null

    @SerializedName("StartDate")
    @Expose
    var startDate : String? = null
}
