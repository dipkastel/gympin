package com.notrika.gympin.ui.main.events.walking.eventCreateWalking

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import kotlinx.android.synthetic.main.dialog_select_date_and_time.view.*
import saman.zamani.persiandate.PersianDate
import saman.zamani.persiandate.PersianDateFormat
import java.util.*
import kotlin.collections.ArrayList


class DialogSelectTime constructor(
    var _activity: Activity,
    var requestManager: RequestManager,
    var _title: String
) :
    CBaseDialogContaner() {

    private var isAutoScroll= false

    var listdays=ArrayList<String>()
    var listHours = listOf("7","8","9","10","11","12","13","14","15","16","17","18","19","20","21")
    var listMinuts = listOf("00","10","20","30","40","50")
    var dayPosition=0
    var hourPosition=0
    var minutsPosition=0


    init {
        initialize(_activity)
        setDialogTitle(_title)
    }


    override fun setView(view: View) {
        val inflater = _activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var thisView = inflater.inflate(R.layout.dialog_select_date_and_time, null)
        super.setView(thisView)
        fillCalender1(thisView)
        fillCalender2(thisView)
        fillCalender3(thisView)
        thisView.txt_btn_select_time.setOnClickListener {
            onDateSelectListener?.onDateSelect(getDateAndTime())
            this.dialog.dismiss()
        }
    }
    var onDateSelectListener:OnDateSelectListener? = null
    interface OnDateSelectListener{
        fun onDateSelect(date:Date)
    }
    fun getDateAndTime(): Date {
        var pd = PersianDate()
        pd.addDay(dayPosition.toLong())
        pd.hour = listHours[hourPosition].toInt()
        pd.minute = listMinuts[minutsPosition].toInt()
        var date = pd.toDate()
        return date
    }

    private fun fillCalender1(thisView: View) {
        var adapterCalender = AdapterCalender(requestManager)
        thisView.rv_date.adapter = adapterCalender
        var pd = PersianDate()
        val pdformater1 = PersianDateFormat("l\nj F")
       for (i in 0..10){
           listdays.add(pdformater1.format(pd))
           pd.addDay(1)
        }
        adapterCalender.addItems(listdays)
        changeToStepScroll(thisView.rv_date)
        adapterCalender.onEventSelectListener = object :AdapterCalender.OnEventSelectListener{
            override fun select(item: Int) {
                dayPosition = item
            }

        }
    }
    private fun fillCalender2(thisView: View) {
        var adapterCalender = AdapterCalender(requestManager)
        thisView.rv_hour.adapter = adapterCalender
        adapterCalender.addItems(listHours)
        changeToStepScroll(thisView.rv_hour)
        adapterCalender.onEventSelectListener = object :AdapterCalender.OnEventSelectListener{
            override fun select(item: Int) {
                hourPosition = item
            }
        }
    }
    private fun fillCalender3(thisView: View) {
        var adapterCalender = AdapterCalender(requestManager)
        thisView.rv_minutes.adapter = adapterCalender
        adapterCalender.addItems(listMinuts)
        changeToStepScroll(thisView.rv_minutes)
        adapterCalender.onEventSelectListener = object :AdapterCalender.OnEventSelectListener{
            override fun select(item: Int) {
                minutsPosition = item
            }
        }
    }

    private fun changeToStepScroll(recyclerView: RecyclerView?) {
        val adapter = recyclerView?.adapter as AdapterCalender
        recyclerView.addOnScrollListener(object :RecyclerView.OnScrollListener(){
            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                super.onScrolled(recyclerView, dx, dy)
                adapter.currentPosition = getCurrentPositionOfScrollview(recyclerView)
                recyclerView.adapter?.notifyDataSetChanged()
            }

            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                super.onScrollStateChanged(recyclerView, newState)
                when (newState) {
                    RecyclerView.SCROLL_STATE_IDLE -> {
                        if(!isAutoScroll)
                            fixPosition(recyclerView)
                        isAutoScroll = false
                    }
                }
            }
        })
    }
    private fun fixPosition(rtcycler: RecyclerView?) {
        rtcycler?.smoothScrollToPosition((rtcycler.adapter as AdapterCalender).currentPosition)
        isAutoScroll =true
    }
    fun getCurrentPositionOfScrollview(recyclerView: RecyclerView) :Int{
        val itemOffset = recyclerView.computeVerticalScrollRange()/ (recyclerView.adapter?.itemCount ?:0 )
        return (recyclerView.computeVerticalScrollOffset()+(itemOffset/2))/itemOffset

    }

}
