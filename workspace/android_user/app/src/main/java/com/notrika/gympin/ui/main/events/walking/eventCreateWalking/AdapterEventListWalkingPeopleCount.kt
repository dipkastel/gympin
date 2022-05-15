package com.notrika.gympin.ui.main.events.walking.eventCreateWalking


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.l_event_user_count.view.*

class AdapterEventListWalkingPeopleCount(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterEventListWalkingPeopleCount.MainViewHolder>() {
    lateinit var items: List<Int>
    var selectedItem = 9999

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Int>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_event_user_count, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.txt_user_count.text ="$item نفر"
        if (position==selectedItem){
            holder.view.txt_user_count.setTextColor(holder.view.resources.getColor(R.color.white_london))
            holder.view.txt_user_count.setBackgroundResource(R.drawable._rectangle_radius_fill_cyan)
        }else{
            holder.view.txt_user_count.setTextColor(holder.view.resources.getColor(R.color.black_Bistre))
            holder.view.txt_user_count.setBackgroundResource(R.drawable._rectangle_radius_strok_grey)
        }
        holder.itemView.setOnClickListener {
            selectedItem = position
            onEventSelectListener?.click(item)
            notifyDataSetChanged()
        }

    }
    var onEventSelectListener:OnEventSelectListener? = null
    interface OnEventSelectListener{
        fun click(item:Int)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}