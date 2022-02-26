package com.notrika.gympin.util.component

import android.content.Context
import android.util.AttributeSet
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.navigation.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.gympin.FragmentGympinDirections
import kotlinx.android.synthetic.main.com_general_actionbar.view.*

class CActionbarGeneral : ConstraintLayout {

    internal var context: Context
    internal var view: View

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_general_actionbar, this)
        init(attrs)


    }
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_general_actionbar, this)
        init(attrs)
    }

    private fun init(set: AttributeSet?) {


        this.view.img_notif.setOnClickListener {
            val action = FragmentGympinDirections.toNotifs()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
        this.view.img_chat.setOnClickListener {

            val action = FragmentGympinDirections.toMessages()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
        this.view.img_coins.setOnClickListener {
            val action = FragmentGympinDirections.toCredit()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
    }

    companion object {

    }

}

