package com.notrika.gympin.util.component

import android.content.Context
import android.util.AttributeSet
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.constraintlayout.widget.ConstraintSet
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.com_general_actionbar.view.*
import kotlinx.android.synthetic.main.com_seek_events.view.*


class CseekbarEvents : ConstraintLayout {

    internal var context: Context
    internal var view: View

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_seek_events, this)
        init(attrs)


    }
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_seek_events, this)
        init(attrs)
    }

    fun setindicatorProgress(percent:Float){
        val cs = ConstraintSet()
        cs.clone(cl_layout)
        cs.setHorizontalBias(txt_indicator.id, (1-percent)*0.9f)
        cs.applyTo(cl_layout)
        invalidate()
    }

    fun setindicatorTitle(title:String){
        txt_indicator.text = title
        invalidate()
    }

    private fun init(set: AttributeSet?) {

    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
    }

    companion object {

    }

}

