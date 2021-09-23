package com.notrika.gympin_master.data.model.Req

import android.util.Base64

class Req_Login(var phoneNumber: String, var password: String) {
    fun getAuth(): String {
        val authPayload = "$phoneNumber:$password"
        val data = authPayload.toByteArray()
        val base64 = Base64.encodeToString(data, Base64.NO_WRAP)
        return "Basic $base64"
    }
}
