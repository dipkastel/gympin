package com.notrika.gympin.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class OprationResult<T> {


    @SerializedName("Data")
    @Expose
    var data: T? = null
    @SerializedName("Success")
    @Expose
    var success: Boolean = false
    @SerializedName("MessageType")
    @Expose
    var messageType: Int? = null
    @SerializedName("Message")
    @Expose
    var message: String? = null
    @SerializedName("ResultDate")
    @Expose
    var resultDate: String? = null
    @SerializedName("LinkParams")
    @Expose
    var linkParams: String? = null
    @SerializedName("Error")
    @Expose
    var error: Any? = null

}
