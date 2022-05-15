package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_event_walking_add_participant(_eventId: Long, _userId: Long) {

    @SerializedName("Event")
    @Expose
    var event: Req_id? =null

    @SerializedName("User")
    @Expose
    var user: Req_id? =null

    init {
        this.event = Req_id(_eventId)
        this.user = Req_id(_userId)
    }
}
