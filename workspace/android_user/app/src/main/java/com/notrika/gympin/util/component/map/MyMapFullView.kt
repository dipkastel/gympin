package com.notrika.gympin.util.component.map

import android.content.Context
import android.preference.PreferenceManager
import android.util.AttributeSet
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import com.notrika.gympin.R
import org.osmdroid.config.Configuration


class MyMapFullView : ConstraintLayout{

    internal var context: Context
    internal var view: View

    private fun init(attrs: AttributeSet? = null) {
        Configuration.getInstance()
            .load(context, PreferenceManager.getDefaultSharedPreferences(context))
    }

    constructor(context: Context) : super(context) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_full_view, this)
        init()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_full_view, this)
        init(attrs)
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_full_view, this)
        init(attrs)
    }


}