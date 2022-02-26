package com.notrika.gympin.ui.main.myProfile

import android.widget.ImageView
import com.notrika.gympin.data.model.res.Res_content

interface OnMyContentClickListener {

    fun Click(imageView: ImageView, item: Res_content)
}
