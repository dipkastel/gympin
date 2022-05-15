package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_Add_Follow(_requested: Long, _requester: Long) {

    @SerializedName("Requested-User")
    @Expose
    var requestedUser: Req_id? =null

    @SerializedName("Requester-User")
    @Expose
    var requesterUser: Req_id? =null

    init {
        this.requestedUser = Req_id(_requested)
        this.requesterUser = Req_id(_requester)
    }
}
