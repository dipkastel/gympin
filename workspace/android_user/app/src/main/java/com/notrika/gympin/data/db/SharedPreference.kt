package com.notrika.gympin.data.db

import androidx.appcompat.app.AppCompatActivity
import android.content.SharedPreferences


class SharedPreference  constructor(context: androidx.appcompat.app.AppCompatActivity) {
    companion object{
        val SH_KEY_INTRO_CHECKED = "SH_KEY_INTRO_CHECKED"

    }
    private val SHAREDPREFERENCES_NAME = "SHAREDPREFERENCES_NAME"
    val pref: SharedPreferences = context.applicationContext.getSharedPreferences(SHAREDPREFERENCES_NAME, 0)
    val editor = pref.edit()
    fun setData(key:String,value:String){
        editor.putString(key, value)
        editor.commit()
    }
    fun getDate(key: String):String{
       return pref.getString(key, "")?:""
    }
}