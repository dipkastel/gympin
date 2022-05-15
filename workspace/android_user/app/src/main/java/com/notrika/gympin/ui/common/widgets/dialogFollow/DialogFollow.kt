package com.notrika.gympin.ui.common.widgets.dialogFollow

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import kotlinx.android.synthetic.main.dialog_follow.view.*


class DialogFollow constructor(
    var _activity: Activity,
    var requestManager: RequestManager,
    var _title: String
) :
    CBaseDialogContaner() {

    lateinit var thisView:View
    init {
        initialize(_activity)
        setDialogTitle(_title)
    }


    fun setUsers(data: List<Res_User>) {

        var adapterDialogFollow = AdapterDialogFollow(requestManager)
        adapterDialogFollow.items = data
        thisView.rv_users.adapter = adapterDialogFollow
        adapterDialogFollow.onUserListItemClickListener = object :
            AdapterDialogFollow.OnUserListItemClickListener {
            override fun Click(item: Res_User) {
                dialog.dismiss()
                onUserListItemClickListener?.Click(item)
            }

        }

    }

    var onUserListItemClickListener: OnUserListItemClickListener? = null

    interface OnUserListItemClickListener{
        fun Click(item:Res_User)
    }

    override fun setView(view: View) {
        val inflater = _activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
         thisView = inflater.inflate(R.layout.dialog_follow, null)
        super.setView(thisView)
    }




}