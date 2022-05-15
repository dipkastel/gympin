package com.notrika.gympin.ui.main.events.walking.eventCreateWalking


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.l_date_time_picker.view.*

class AdapterCalender(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterCalender.MainViewHolder>() {
    var currentPosition: Int = 0
    lateinit var items: List<String>


    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<String>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_date_time_picker, parent,false)
        itemView.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {

        var item = items[position]
        holder.view.txt_select_time.text = item
        onEventSelectListener?.select(currentPosition)

    }
    var onEventSelectListener:OnEventSelectListener? = null
    interface OnEventSelectListener{
        fun select(item:Int)
    }

    override fun getItemCount(): Int {
        return items.size
    }


}