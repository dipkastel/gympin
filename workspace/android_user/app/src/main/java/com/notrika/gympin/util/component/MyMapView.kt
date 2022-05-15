package com.notrika.gympin.util.component

import android.content.Context
import android.graphics.Canvas
import android.preference.PreferenceManager
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import androidx.cardview.widget.CardView
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_map_data
import kotlinx.android.synthetic.main.com_map_view.view.*
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.ItemizedIconOverlay
import org.osmdroid.views.overlay.Overlay
import org.osmdroid.views.overlay.OverlayItem


class MyMapView : CardView {
    interface OnPointSelectListener {
        fun onSelect(lat: Double, lon: Double)
        fun goToFullScreen()
    }

    var onPointSelectListener: OnPointSelectListener? = null
    internal var context: Context
    internal var customView: View
    lateinit var map: MapView
    var geoPoint: GeoPoint?=null
    var address: String?=null
    var moverlays: ItemizedIconOverlay<OverlayItem>? = null
    var overlay:Overlay?=null
    private fun init(attrs: AttributeSet? = null) {

        Configuration.getInstance()
            .load(context, PreferenceManager.getDefaultSharedPreferences(context))

        map = customView.map_view
        map.setTileSource(TileSourceFactory.MAPNIK)
        map.controller.setZoom(10)
        map.controller.setCenter(GeoPoint( 35.6842,51.3523))
        map.isClickable = true
        map.setUseDataConnection(true)
        map.setBuiltInZoomControls(false)
        map.setMultiTouchControls(true)
        map.isFocusable = true
        map.isFocusableInTouchMode = true
        overlay = object : Overlay(getContext()) {
            override fun draw(c: Canvas?, osmv: MapView?, shadow: Boolean) {            }

            override fun onSingleTapConfirmed(e: MotionEvent, mapView: MapView): Boolean {
                geoPoint = mapView.projection.fromPixels(e.x.toInt(), e.y.toInt()) as GeoPoint
                setSinglePoint(geoPoint!!,mapView)
                return true
            }
        }
        map.overlayManager.add(overlay)
        img_full_screen.setOnClickListener{
            onPointSelectListener?.goToFullScreen()
        }

    }

    private fun setSinglePoint(geoPoint: GeoPoint, mapView: MapView) {
        val overlayArray = ArrayList<OverlayItem>()
        val mapItem = OverlayItem("", "", geoPoint)
        var image = resources.getDrawable(R.drawable.ico_location)
        image.setBounds(0,0,10,10)
        mapItem.setMarker(image)
        overlayArray.add(mapItem)
        if (moverlays == null) {
            moverlays =
                ItemizedIconOverlay(getContext(), overlayArray, null)
            mapView.overlays.add(moverlays)
            mapView.invalidate()
        } else {
            mapView.overlays.remove(moverlays)
            mapView.invalidate()
            moverlays =
                ItemizedIconOverlay(getContext(), overlayArray, null)
            mapView.overlays.add(moverlays)
        }
        onPointSelectListener?.onSelect(geoPoint.latitude, geoPoint.longitude)
    }

    fun setAddress(data: Res_map_data?) {
        try {
            txt_address.visibility = View.GONE
            data?.let {
                data.address?.let {
                    txt_address.visibility = View.VISIBLE
                    this.address = "${it.city?:""},${it.neighbourhood?:""},${it.road?:""}"
                    txt_address.text = this.address
                }
            }

        }catch (E:Exception){
            txt_address.visibility = View.GONE
        }
    }


    fun setSelectedLocation(selectedpoint:GeoPoint) {
        geoPoint = selectedpoint
        setSinglePoint(geoPoint!!,map)
        map.overlayManager.remove(overlay)
        invalidate()
    }


    constructor(context: Context) : super(context) {
        this.context = context
        this.customView = View.inflate(context, R.layout.com_map_view, this)
        init()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        this.context = context
        this.customView = View.inflate(context, R.layout.com_map_view, this)
        init(attrs)
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        this.context = context
        this.customView = View.inflate(context, R.layout.com_map_view, this)
        init(attrs)
    }


}