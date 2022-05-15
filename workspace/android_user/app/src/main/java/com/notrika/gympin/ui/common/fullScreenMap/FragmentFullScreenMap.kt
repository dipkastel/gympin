package com.notrika.gympin.ui.common.fullScreenMap

import android.content.Context
import android.graphics.Canvas
import android.os.Bundle
import android.preference.PreferenceManager
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.setFragmentResult
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.com_map_view.view.*
import kotlinx.android.synthetic.main.fragment_full_screen_map.*
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.ItemizedIconOverlay
import org.osmdroid.views.overlay.Overlay
import org.osmdroid.views.overlay.OverlayItem


class FragmentFullScreenMap : InnerPageFragment() {

    private lateinit var viewModel: ViewModelFullScreenMap

    var geoPoint: GeoPoint?=null
    var address: String?=null
    var moverlays: ItemizedIconOverlay<OverlayItem>? = null
    var overlay:Overlay?=null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_full_screen_map, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel =
            ViewModelProviders.of(this, providerFactory).get(ViewModelFullScreenMap::class.java)
        loadMap()
        setListeners()
    }

    private fun setListeners() {
        btn_submit.setOnClickListener {
            setFragmentResult(MAP_RESULT_KEY, bundleOf("data" to "result data"))
            findNavController().navigateUp()
        }
    }

    fun loadMap() {
        Configuration.getInstance()
            .load(context, PreferenceManager.getDefaultSharedPreferences(context))

        _full_map.setTileSource(TileSourceFactory.MAPNIK)
        _full_map.controller.setZoom(10)
        _full_map.controller.setCenter(GeoPoint( 35.6842,51.3523))
        _full_map.isClickable = true
        _full_map.setUseDataConnection(true)
        _full_map.setBuiltInZoomControls(false)
        _full_map.setMultiTouchControls(true)
        _full_map.isFocusable = true
        _full_map.isFocusableInTouchMode = true
        overlay = object : Overlay(getContext()) {
            override fun draw(c: Canvas?, osmv: MapView?, shadow: Boolean) {            }

            override fun onSingleTapConfirmed(e: MotionEvent, mapView: MapView): Boolean {
                geoPoint = mapView.projection.fromPixels(e.x.toInt(), e.y.toInt()) as GeoPoint
                setSinglePoint(geoPoint!!,mapView)
                return true
            }
        }
        _full_map.overlayManager.add(overlay)
    }

    fun setSelectedLocation(selectedpoint:GeoPoint) {
        geoPoint = selectedpoint
        setSinglePoint(geoPoint!!,_full_map)
        _full_map.overlayManager.remove(overlay)
    }

    fun setSinglePoint(geoPoint: GeoPoint, mapView: MapView) {
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
    }

    companion object{
        open var MAP_RESULT_KEY = "MAP_RESULT_KEY"
    }
}
