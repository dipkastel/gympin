package com.notrika.gympin_master.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_CacheItem {

    @SerializedName("TableName")
    @Expose
    var tableName: String? = null

    @SerializedName("TableVersion")
    @Expose
    var tableVersion: Long? = null

}
