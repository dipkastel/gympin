package com.notrika.gympin.ui.main.notifs

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import com.notrika.gympin.R
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import kotlinx.android.synthetic.main.dialog_messages.view.*

class DialogMessageDetail constructor(var _activity: Activity,var _title:String,var _message:String): CBaseDialogContaner() {

    init {
        initialize(_activity)
        setTitle(_title)
    }



    override fun setView(view: View) {
        val inflater = _activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var thisView = inflater.inflate(R.layout.dialog_messages, null)
        thisView.txt_message.text = _message
        super.setView(thisView)
    }

}