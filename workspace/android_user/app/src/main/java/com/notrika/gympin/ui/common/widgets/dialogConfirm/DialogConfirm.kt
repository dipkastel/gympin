package com.notrika.gympin.ui.common.widgets.dialogConfirm

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import com.notrika.gympin.R
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import kotlinx.android.synthetic.main.dialog_confirm.view.*

class DialogConfirm : CBaseDialogContaner() {

    lateinit var thisView:View
    lateinit var activity:Activity

    override fun setView(view: View) {
        val inflater = activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        thisView = inflater.inflate(R.layout.dialog_confirm, null)
        super.setView(thisView)
    }

    fun init(activity:Activity):DialogConfirm{
        this.activity = activity
        initialize(activity)
        return this
    }

    fun setTitle(title:String):DialogConfirm{
        setDialogTitle(title)
        return this
    }

    fun setMessage(message:String):DialogConfirm{
        thisView.txt_message.text = message
        return this
    }

    fun setAction(onAction:OnAction):DialogConfirm{
        thisView.txt_btn_confirm.setOnClickListener {
            onAction.Confirm()
        }
        thisView.txt_btn_dismiss.setOnClickListener {
            dialog.dismiss()
            onAction.Dismiss()
        }
        return this
    }

    interface OnAction{
        fun Confirm()
        fun Dismiss()
    }
}