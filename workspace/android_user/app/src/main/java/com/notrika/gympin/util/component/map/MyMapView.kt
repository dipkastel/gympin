package com.notrika.gympin.util.component.map

import android.content.Context
import android.preference.PreferenceManager
import android.util.AttributeSet
import android.util.Log
import android.view.View
import androidx.cardview.widget.CardView
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.com_map_view.view.*
import org.osmdroid.config.Configuration


class MyMapView : CardView,IMapActions{

    internal var context: Context
    internal var view: View
    lateinit var imapUse:ImapUse
    var poinsCount:Int = 2
    var fullScreenMode = false
        set(value) {
            field = value
            setMode()
        }


    private fun init(attrs: AttributeSet? = null) {
        Configuration.getInstance()
            .load(context, PreferenceManager.getDefaultSharedPreferences(context))

         imapUse = MapUseImpl(this,view.map_view,poinsCount)
        setMode()

    }

    private fun setMode() {
        if(fullScreenMode){
            img_full_screen.visibility = View.VISIBLE
            img_full_screen.setOnClickListener {
                var dialog = FullScreenMapDialog(imapUse,context,poinsCount)
                dialog.onfinishListener= object :OnSubmitListener{
                    override fun submit(points: List<MapItemEntity>) {

                        imapUse.clearPoints()
                        points.forEach{
                            imapUse.addPoint(it)

                        }
                    }

                }
                dialog.show()

            }
        }else{
            img_full_screen.visibility = View.GONE
        }
    }


    constructor(context: Context) : super(context) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_view, this)
        init()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_view, this)
        init(attrs)
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        this.context = context
        this.view = View.inflate(context, R.layout.com_map_view, this)
        init(attrs)
    }

    override fun getcontext(): Context {
        return this.context
    }

    override fun setAddress(data: MapItemEntity) {

        try {
            txt_address.visibility = View.GONE
            data.address.let {
                data.address?.let {
                    txt_address.visibility = View.VISIBLE
                    txt_address.text = it
                }
            }

        } catch (E: Exception) {
            txt_address.visibility = View.GONE
        }
    }

    override fun invalidateView() {
        invalidate()
    }


    fun getPoins(): List<MapItemEntity> {
        return imapUse.getSelectedPoints()
    }

    fun setSelectedLocation(mapitem: MapItemEntity) {
        imapUse.addPoint(mapitem)
    }


}