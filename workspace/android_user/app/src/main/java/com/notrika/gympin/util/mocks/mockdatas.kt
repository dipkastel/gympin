package com.notrika.gympin.util.mocks

import android.content.Context
import android.content.res.AssetManager
import androidx.annotation.NonNull
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.*
import java.lang.reflect.Type


class mockdatas {
    fun getHomePageMockData(context: Context): OprationResult<List<Res_Home_Page>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/homePage.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_Home_Page>>>() {}.type
        return Gson().fromJson(data, collectionType)
    }

    fun getMyEventsMockData(context: Context): OprationResult<List<Res_User_Event>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/myEvents.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_User_Event>>>() {}.type
        return Gson().fromJson(data, collectionType)
    }

    fun getMyContentMockData(context: Context): OprationResult<List<Res_content>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/myContents.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_content>>>(){}.type
        return Gson().fromJson(data, collectionType)
    }

    fun getNotifsMockData(context: Context): OprationResult<List<Res_notification>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/notifes.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_notification>>>(){}.type
        return Gson().fromJson(data, collectionType)
    }
    fun getMessagesMockData(context: Context): OprationResult<List<Res_message>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/messages.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_message>>>(){}.type
        return Gson().fromJson(data, collectionType)
    }
    fun getContentsMockData(context: Context): OprationResult<List<Res_content>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/contents.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_content>>>(){}.type
        return Gson().fromJson(data, collectionType)
    }
    fun getChatMockData(context: Context): OprationResult<Res_last_chat> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/chat.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<Res_last_chat>>(){}.type
        return Gson().fromJson(data, collectionType)
    }
    fun getMarketMockData(context: Context): OprationResult<List<Res_market>> {
        val manager: AssetManager = context.assets
        val data = manager.readAssetsFile("mockdata/market.json")
        val collectionType: Type? =
            object : TypeToken<OprationResult<List<Res_market>>>(){}.type
        return Gson().fromJson(data, collectionType)
    }
    fun AssetManager.readAssetsFile(fileName : String): String = open(fileName).bufferedReader().use{it.readText()}
}