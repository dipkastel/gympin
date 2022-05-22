package com.notrika.gympin.util.component.map

import android.os.Handler
import com.google.gson.Gson
import com.notrika.gympin.data.model.res.Res_map_data
import okhttp3.*
import java.io.IOException

open class addressHelper {
    companion object{
        open fun getAddressOf(item:MapItemEntity, result: OnAddressResult){

            val client = OkHttpClient()

            val handler = Handler()

            val request: Request = Request.Builder()
                .url("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + item.geoPoint?.latitude + "&lon=" + item.geoPoint?.longitude + "&zoom=22&addressdetails=1")
                .build()


            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {

                    handler.post {
                        result.onFailed()
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    var responses = Gson().fromJson(response.body()?.string(), Res_map_data::class.java)

                    handler.post {
                        result.onResult(responses)

                    }
                }

            })
        }
    }
}