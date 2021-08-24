package com.notrika.gympin_master.data.model

import android.util.Base64
import com.bumptech.glide.RequestManager

class Req_Login(var phoneNumber: String, var password: String) {
    fun getAuth(): String {
        val authPayload = "$phoneNumber:$password"
        val data = authPayload.toByteArray()
        val base64 = Base64.encodeToString(data, Base64.NO_WRAP)
        return "Basic $base64"
    }
}
