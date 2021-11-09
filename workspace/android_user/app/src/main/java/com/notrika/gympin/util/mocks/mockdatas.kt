package com.notrika.gympin.util.mocks

import android.content.Context
import android.content.res.AssetManager
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_Home_Page
import java.lang.reflect.Type


class mockdatas {
    fun getHomePageMockData(context: Context): OprationResult<List<Res_Home_Page>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/homePage.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_Home_Page>>>() {}.type
        return Gson().fromJson(data, collectionType)
    }


    fun AssetManager.readAssetsFile(fileName : String): String = open(fileName).bufferedReader().use{it.readText()}
}