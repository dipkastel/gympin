package com.notrika.gympin.util.component.map

import android.app.Dialog
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Handler
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.Window
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import com.google.gson.Gson
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

    var geoPointStart: GeoPoint? = null
    var geoPointEnd: GeoPoint? = null
    var address: String? = null
    var moverlays: ItemizedIconOverlay<OverlayItem>? = null
    var overlay: Overlay? = null
    var overlayArray = ArrayList<OverlayItem>()

    fun initialize(_context: Context) {
        this.context = _context;
        dialog = Dialog(context, R.style.baseDialog)
        val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        try {
            dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        } catch (e: Exception) {
        }
        view = inflater.inflate(R.layout.c_full_screen_map, null)
        dialog.setContentView(view)
        dialog.window?.setBackgroundDrawable(
            ColorDrawable(Color.TRANSPARENT)
        )
        setListeners()
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
    }

    private fun pointSelect(e: MotionEvent, mapView: MapView) {
        if (geoPointStart == null) {
            geoPointStart = mapView.projection.fromPixels(e.x.toInt(), e.y.toInt()) as GeoPoint
            setPoint(geoPointStart!!, mapView)
            setAddress(geoPointStart!!, "از ", view.txt_start_address)
            view.txt_close_start.setOnClickListener {
                view.cl_start.visibility = View.INVISIBLE
                overlayArray.remove(overlayArray.filter { o -> o.point.latitude == geoPointStart!!.latitude }
                    .first())
                geoPointStart = null;
                invalidateMap(mapView)
                settitle()
            }

            settitle()
            return
        }
        if (geoPointEnd == null) {
            geoPointEnd = mapView.projection.fromPixels(e.x.toInt(), e.y.toInt()) as GeoPoint
            setPoint(geoPointEnd!!, mapView)
            setAddress(geoPointEnd!!, "تا ", view.txt_end_address)
            view.txt_close_end.setOnClickListener {
                view.cl_end.visibility = View.INVISIBLE
                overlayArray.remove(overlayArray.filter { o -> o.point.latitude == geoPointEnd!!.latitude }
                    .first())
                geoPointEnd = null;
                invalidateMap(mapView)
                settitle()
            }
            settitle()
            return
        }

    }

    fun settitle() {

        view.txt_title.text =
            when {
                (geoPointStart == null) -> context.getString(R.string.select_start_point)
                (geoPointEnd == null) -> context.getString(R.string.select_end_point)
                else -> context.getString(R.string.submit_points)
            }
    }

    private fun setAddress(geoPoint: GeoPoint, preposition: String, txtDest: TextView) {
        val client = OkHttpClient()

        val handler = Handler()

        val request: Request = Request.Builder()
            .url("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + geoPoint.latitude + "&lon=" + geoPoint.longitude + "&zoom=22&addressdetails=1")
            .build()


        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {

                handler.post {
                    txtDest.text = "آدرس نا مشخص"
                }
            }

            override fun onResponse(call: Call, response: Response) {
                var responses = Gson().fromJson(response.body()?.string(), Res_map_data::class.java)

                handler.post {
                    txtDest.text = preposition + responses.displayName
                    (txtDest.parent as ConstraintLayout).visibility = View.VISIBLE
                }
            }

        })

    }

    private fun setListeners() {
        view.btn_submit.setOnClickListener {

        }
    }

    fun setPoint(geoPoint: GeoPoint, mapView: MapView) {
        val mapItem = OverlayItem("", "", geoPoint)
        var image = context.resources.getDrawable(R.drawable.ico_location)
        image.setBounds(0, 0, 10, 10)
        mapItem.setMarker(image)
        overlayArray.add(mapItem)
        invalidateMap(mapView)
    }

    private fun invalidateMap(mapView: MapView) {
        if (moverlays == null) {
            moverlays =
                ItemizedIconOverlay(context, overlayArray, null)
            mapView.overlays.add(moverlays)
            mapView.invalidate()
        } else {
            mapView.overlays.remove(moverlays)
            mapView.invalidate()
            moverlays =
                ItemizedIconOverlay(context, overlayArray, null)
            mapView.overlays.add(moverlays)
        }
    }


}