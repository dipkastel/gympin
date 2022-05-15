package com.notrika.gympin.data.model.req

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Req_id{
    constructor(_id: Long){
        this.id = _id
    }
    @SerializedName("Id")
    @Expose
    var id: Long? = null
}
