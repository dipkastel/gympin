package com.notrika.gympin.ui.main.sports.eventsList


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User_Event
import kotlinx.android.synthetic.main.l_sport_event.view.*
import java.text.SimpleDateFormat

class AdapterEventsList(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterEventsList.MainViewHolder>() {
    lateinit var items: List<Res_User_Event>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_User_Event>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_sport_event, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]

        requestManager.load(item.creator?.profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.img_user.layoutParams.width / 2)
            ).into(holder.view.img_user)
        holder.view.txt_user_name.text = item.creator?.name
        holder.view.txt_event_name.text = item.name
        holder.view.txt_event_address.text = item.address
        holder.view.txt_event_date.text = SimpleDateFormat("yyyy-MM-dd").format(item.date)
        holder.view.txt_event_time.text = SimpleDateFormat("HH:mm").format(item.date)
        holder.itemView.setOnClickListener {
            onEventSelectListener.click(item)
        }
    }
    lateinit var onEventSelectListener:OnEventSelectListener
    interface OnEventSelectListener{
        fun click(item:Res_User_Event)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}