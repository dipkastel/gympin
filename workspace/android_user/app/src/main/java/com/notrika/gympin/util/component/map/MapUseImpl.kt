package com.notrika.gympin.util.component.map

import android.graphics.Canvas
import android.view.MotionEvent
import android.view.View
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_map_data
import kotlinx.android.synthetic.main.com_map_view.view.*
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.ItemizedIconOverlay
import org.osmdroid.views.overlay.Overlay
import org.osmdroid.views.overlay.OverlayItem

class MapUseImpl(var mapActions:IMapActions,var mapView:MapView,var pointCount:Int):ImapUse{

    var mapPoints: ArrayList<MapItemEntity> = ArrayList()
    var moverlays: ItemizedIconOverlay<OverlayItem>? = null
    var overlay: Overlay? = null
    val overlayArray = ArrayList<OverlayItem>()
    init{
        mapInit()
    }

    fun mapInit(){

        mapView.overlayManager.add(overlay)
        mapView.setTileSource(TileSourceFactory.MAPNIK)
        mapView.controller.setZoom(10)
        mapView.controller.setCenter(GeoPoint(35.6842, 51.3523))
        mapView.isClickable = true
        mapView.setUseDataConnection(true)
        mapView.setBuiltInZoomControls(false)
        mapView.setMultiTouchControls(true)
        mapView.isFocusable = true
        mapView.isFocusableInTouchMode = true
        var overlay: Overlay = object : Overlay(mapActions.getcontext()) {
            override fun draw(c: Canvas?, osmv: MapView?, shadow: Boolean) {}

            override fun onSingleTapConfirmed(e: MotionEvent, mapView: MapView): Boolean {
                singleTapConfirmed(e, mapView)
                return true
            }
        }
        mapView.overlayManager.add(overlay)
    }

    fun singleTapConfirmed(e: MotionEvent, mapView: MapView) {
        var mapItem = MapItemEntity(
            mapView.projection.fromPixels(
                e.x.toInt(),
                e.y.toInt()
            ) as GeoPoint
        )
        addPointOnmap(mapItem)
    }

    private fun addPointOnmap(mapItem: MapItemEntity) {
        if(mapPoints.count()<pointCount){
            mapPoints.add(mapItem)
            setSinglePoint(mapItem)
            addressHelper.getAddressOf(mapItem,object :OnAddressResult{
                override fun onResult(responses: Res_map_data) {
                    setAddress(responses,mapItem)
                }

                override fun onFailed() {

                }
            })
        }
    }

    fun setAddress(data: Res_map_data?,item:MapItemEntity) {
        item.address = data?.displayName
        mapActions.setAddress(item)
    }



    fun setSinglePoint(mapitem: MapItemEntity) {
        val mapItem = OverlayItem("", "", mapitem.geoPoint)
        var image = mapActions.getcontext().resources.getDrawable(R.drawable.ico_location)
        image.setBounds(0, 0, 10, 10)
        mapItem.setMarker(image)
        overlayArray.add(mapItem)
        invalidateMap()
    }



    fun invalidateMap() {
        if (moverlays == null) {
            moverlays =
                ItemizedIconOverlay(mapActions.getcontext(), overlayArray, null)
            mapView.overlays.add(moverlays)
            mapView.invalidate()
        } else {
            mapView.overlays.remove(moverlays)
            mapView.invalidate()
            moverlays =
                ItemizedIconOverlay(mapActions.getcontext(), overlayArray, null)
            mapView.overlays.add(moverlays)
            mapView.invalidate()
        }
    }


    override fun getSelectedPoints(): List<MapItemEntity> {
        return mapPoints
    }

    override fun removePoint(itemEntity: MapItemEntity) {
        overlayArray.remove(overlayArray.find { p -> p.point.latitude == itemEntity.geoPoint?.latitude })
        mapPoints.remove(itemEntity)
        invalidateMap()
    }

    override fun addPoint(mapitem: MapItemEntity) {
        addPointOnmap(mapitem)
    }

    override fun clearPoints() {

        overlayArray.clear()
        mapPoints.clear()
        invalidateMap()
    }


}