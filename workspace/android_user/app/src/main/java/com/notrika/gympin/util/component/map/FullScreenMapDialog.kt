package com.notrika.gympin.util.component.map

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.graphics.Canvas
import android.os.Handler
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.Window
import com.google.gson.Gson
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_map_data
import kotlinx.android.synthetic.main.c_full_screen_map.view.*
import okhttp3.*
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.ItemizedIconOverlay
import org.osmdroid.views.overlay.Overlay
import org.osmdroid.views.overlay.OverlayItem
import java.io.IOException


class FullScreenMapDialog {


    lateinit var dialog: Dialog
    lateinit var context: Context
    lateinit var view: View
    lateinit var adapter:AdapterMapAddress

    var geoPoints: ArrayList<MapItemEntity> = ArrayList()
    var pointCounts = 0;
    var address: String? = null
    var moverlays: ItemizedIconOverlay<OverlayItem>? = null
    var overlay: Overlay? = null
    var overlayArray = ArrayList<OverlayItem>()

    fun initialize(_context: Context, _pointCounts: Int) {
        pointCounts = _pointCounts
        this.context = _context;
        dialog = Dialog(context, R.style.baseDialog)
        val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        try {
            dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        } catch (e: Exception) {
        }
        view = inflater.inflate(R.layout.c_full_screen_map, null)
        dialog.setContentView(view)
        setListeners()
        adapter = AdapterMapAddress()
        view.rv_address.adapter =adapter
        loadMap()
        dialog.show()
    }

    fun loadMap() {
        view._full_map.setTileSource(TileSourceFactory.MAPNIK)
        view._full_map.controller.setZoom(10)
        view._full_map.controller.setCenter(GeoPoint(35.6842, 51.3523))
        view._full_map.isClickable = true
        view._full_map.setUseDataConnection(true)
        view._full_map.setBuiltInZoomControls(false)
        view._full_map.setMultiTouchControls(true)
        view._full_map.isFocusable = true
        view._full_map.isFocusableInTouchMode = true
        overlay = object : Overlay(context) {
            override fun draw(c: Canvas?, osmv: MapView?, shadow: Boolean) {}

            override fun onSingleTapConfirmed(e: MotionEvent, mapView: MapView): Boolean {
                pointSelect(e, mapView)
                return true
            }
        }
        view._full_map.overlayManager.add(overlay)

        adapter.onItemClickListener = object :AdapterMapAddress.OnItemClickListener{
            override fun click(itemEntity: MapItemEntity) {
                geoPoints.remove(itemEntity)
                adapter.removeItem(itemEntity)

                removePointOnMap(itemEntity)
                settitle()
            }
        }

    }

    private fun pointSelect(e: MotionEvent, mapView: MapView) {
        if (geoPoints.count()< pointCounts) {
            var mapItem = MapItemEntity(mapView.projection.fromPixels(e.x.toInt(), e.y.toInt()) as GeoPoint)
            geoPoints.add(mapItem)
            setPointOnMap(mapItem)
            setAddress(mapItem)

        }
        settitle()
    }


    fun settitle() {

        view.txt_title.text =
            when {
                (geoPoints.count()<1) -> context.getString(R.string.select_start_point)
                (geoPoints.count()<2) -> context.getString(R.string.select_end_point)
                else -> context.getString(R.string.submit_points)
            }
    }

    private fun setAddress(mapitem: MapItemEntity) {
        val client = OkHttpClient()

        val handler = Handler()

        val request: Request = Request.Builder()
            .url("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + mapitem.geoPoint?.latitude + "&lon=" + mapitem.geoPoint?.longitude + "&zoom=22&addressdetails=1")
            .build()


        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {

                handler.post {
//                    adapter.items.add("آدرس نا مشخص")
                }
            }

            override fun onResponse(call: Call, response: Response) {
                var responses = Gson().fromJson(response.body()?.string(), Res_map_data::class.java)

                handler.post {

                    responses.displayName?.let {
                        mapitem.address =it
                            adapter.addItem(mapitem)
                    }
                }
            }

        })

    }

    private fun setListeners() {
        view.btn_submit.setOnClickListener {
            if (geoPoints.count()==pointCounts){
                onfinishListener?.submit(geoPoints)
                dialog.dismiss()
            }else{
                CiBar().createAlert(context as Activity,"کممه",CiBar.LONG_CBAR_DURATION).show()
            }
        }
    }

    fun setPointOnMap(mapitem: MapItemEntity) {
        val mapItem = OverlayItem("", "", mapitem.geoPoint)
        var image = context.resources.getDrawable(R.drawable.ico_location)
        image.setBounds(0, 0, 10, 10)
        mapItem.setMarker(image)
        overlayArray.add(mapItem)
        invalidateMap()
    }

    private fun removePointOnMap(mapItemEntity: MapItemEntity) {
        overlayArray.remove(overlayArray.find { p->p.point.latitude==mapItemEntity.geoPoint?.latitude })
        invalidateMap()
    }
    private fun invalidateMap() {
        if (moverlays == null) {
            moverlays =
                ItemizedIconOverlay(context, overlayArray, null)
            view._full_map.overlays.add(moverlays)
            view._full_map.invalidate()
        } else {
            view._full_map.overlays.remove(moverlays)
            view._full_map.invalidate()
            moverlays =
                ItemizedIconOverlay(context, overlayArray, null)
            view._full_map.overlays.add(moverlays)
            view._full_map.invalidate()
        }
    }

    fun setgeoPoints(geoPoints: java.util.ArrayList<MapItemEntity>) {
        this.geoPoints = geoPoints;
        geoPoints.forEach{
            setPointOnMap(it)
            setAddress(it)
        }
        settitle()
    }

    var onfinishListener:OnSubmitListener?=null

    interface OnSubmitListener {

        fun submit(points: List<MapItemEntity>)
    }
}
