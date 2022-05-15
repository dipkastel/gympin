package com.notrika.gympin.util.dialog

import android.app.Dialog
import android.view.View

interface CDialog  {
    fun setView(view:View)
    fun onloadComplete()
    fun setDialogOptions(dialog:Dialog)

}