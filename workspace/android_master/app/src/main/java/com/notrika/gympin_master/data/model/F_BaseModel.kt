package com.notrika.gympin_master.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin_master.BuildConfig

abstract class F_BaseModel {
    @SerializedName("AppIsActive")
    @Expose
    var appIsActive: Boolean = true
    @SerializedName("UpdateForceStatus")
    @Expose
    var updateForceStatus: Boolean = false
    @SerializedName("UpdateRegularStatus")
    @Expose
    var updateRegularStatus: Boolean = false
    @SerializedName("Description")
    @Expose
    var description: String = ""
    @SerializedName("UpdateUrl")
    @Expose
    var updateUrl: String = ""
    @SerializedName("UrlwhenAppDeactive")
    @Expose
    var urlwhenAppDeactive: String = ""
    @SerializedName("ServerAppVersion")
    @Expose
    var serverAppVersion: Float = BuildConfig.VERSION_NAME.toFloat()
}