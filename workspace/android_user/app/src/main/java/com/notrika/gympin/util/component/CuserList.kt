package com.notrika.gympin.util.component

import android.content.Context
import android.util.AttributeSet
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.comon.Participant
import com.notrika.gympin.data.model.res.Res_User
import kotlinx.android.synthetic.main.com_user_list.view.*

class CuserList : ConstraintLayout {

    internal var context: Context
    internal var view: View
    var participants = ArrayList<Res_User>()

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_user_list, this)
        init(attrs)


    }
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_user_list, this)
        init(attrs)
    }

    private fun init(set: AttributeSet?) {

    }
    fun setParticipants(participant: List<Res_User>,requestManager: RequestManager){
        participants.clear()
        participants.addAll(participant)
        fillrecycler(requestManager)
        invalidate()

    }

    private fun fillrecycler(requestManager: RequestManager) {
        var adapter = AdapterParticipants(requestManager)
        rv_participants.adapter =adapter
        adapter.addItems(participants)
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
    }

    companion object {

    }

}

