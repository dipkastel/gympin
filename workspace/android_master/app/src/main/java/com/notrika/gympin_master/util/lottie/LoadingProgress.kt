package com.notrika.gympin_master.util.lottie

import android.content.Context
import android.os.Build
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.constraintlayout.widget.ConstraintSet
import com.airbnb.lottie.LottieAnimationView
import com.notrika.gympin_master.R
import java.io.IOException
import java.nio.charset.Charset
import java.nio.charset.StandardCharsets
import java.util.*
import javax.inject.Inject


class LoadingProgress @Inject constructor() {

    var AnimationList: HashMap<String, LottieAnimationView> = HashMap()


    fun addProgress(view: ConstraintLayout, innerTag: String, type: Types) {
        fetch(view, innerTag, type)
    }

    fun addProgress(view: LinearLayout, innerTag: String, type: Types) {
        fetch(view, innerTag, type)
    }

    private fun fetch(view: ViewGroup, innerTag: String, type: Types) {
        val layoutParams = ConstraintLayout.LayoutParams(ConstraintLayout.LayoutParams.MATCH_PARENT, ConstraintLayout.LayoutParams.MATCH_PARENT)
        when (type) {
            Types.ReservesLoading -> {
                layoutParams.height = view.resources.getDimension(R.dimen._120sdp).toInt()
                layoutParams.width = view.resources.getDimension(R.dimen._120sdp).toInt()
                val json = loadJSONFromAsset(view.context, "lottiefiles/reservesLoading.json")
                addView(json, layoutParams, innerTag, view, true)
            }

        }
    }


    private fun addView(json: String, layoutParams: ConstraintLayout.LayoutParams, innerTag: String, view: ViewGroup, isloop: Boolean) {

        val animationView = LottieAnimationView(view.context)

        animationView.setAnimationFromJson(json, innerTag)
        animationView.frame = 60
        animationView.alpha = 1f
        animationView.tag = "progress"
        animationView.loop(isloop)
        if (!isloop){
//            animationView.repeatCount = 1
        }
        layoutParams.bottomToBottom = ConstraintSet.PARENT_ID
        layoutParams.endToEnd = ConstraintSet.PARENT_ID
        layoutParams.startToStart = ConstraintSet.PARENT_ID
        layoutParams.topToTop = ConstraintSet.PARENT_ID
        layoutParams.setMargins(0, 40, 0, 40)
        animationView.layoutParams = layoutParams
        AnimationList[innerTag] = animationView
        view.addView(animationView)
        animationView.playAnimation()

    }


    fun removeProgress(innerTag: String) {
        val animationView = AnimationList[innerTag]
        val parent = animationView?.parent
        try {
            (parent as ViewGroup).removeView(animationView)
        } catch (E: Exception) {
            //removed earlier
        }
        AnimationList.remove(innerTag)
    }

    fun loadJSONFromAsset(context: Context, JsonName: String): String {
        val json: String
        try {
            val jsonObject = context.applicationContext.assets.open(JsonName)
            val size = jsonObject.available()
            val buffer = ByteArray(size)
            jsonObject.read(buffer)
            jsonObject.close()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                json = String(buffer, StandardCharsets.UTF_8)
            } else {
                json = String(buffer, Charset.forName("UTF-8"))
            }
        } catch (ex: IOException) {
            ex.printStackTrace()
            return ""
        }

        return json
    }

    enum class Types {
        ReservesLoading
    }
}