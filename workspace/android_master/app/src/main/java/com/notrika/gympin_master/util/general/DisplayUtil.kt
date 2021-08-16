package com.notrika.gympin_master.util.general

import android.R
import android.util.DisplayMetrics
import android.util.TypedValue

class DisplayUtil {

    fun getScreenWidth(activity: androidx.appcompat.app.AppCompatActivity):Int{

        val displayMetrics = DisplayMetrics()
        activity.windowManager?.defaultDisplay?.getMetrics(displayMetrics)
       return displayMetrics.widthPixels

    }

    fun getHeaderSize(activity: androidx.appcompat.app.AppCompatActivity): Int {
        val tv = TypedValue()
            if (activity.theme.resolveAttribute(R.attr.actionBarSize, tv, true)) {
                return TypedValue.complexToDimensionPixelSize(tv.data, activity.resources.displayMetrics)
            }
        return 0
    }
}