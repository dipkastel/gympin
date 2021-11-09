package com.notrika.gympin.ui.main.sports

import android.widget.ImageView
import com.notrika.gympin.data.model.res.Res_sport

interface OnSportClickListener {
    fun Click(imageView: ImageView, item: Res_sport)
}