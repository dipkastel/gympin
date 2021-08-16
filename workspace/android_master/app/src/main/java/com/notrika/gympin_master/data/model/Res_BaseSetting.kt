package com.notrika.gympin_master.data.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Res_BaseSetting  :F_BaseModel() {

    @SerializedName("ApiBase")
    @Expose
    var apiBase: String = ""
    @SerializedName("MediaBase")
    @Expose
    var mediaBase: String = ""
    @SerializedName("WebViewBase")
    @Expose
    var webViewBase: String = ""

    @SerializedName("CacheList")
    @Expose
    var cacheList: List<Res_CacheItem>? = null



}
