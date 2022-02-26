package com.notrika.gympin.ui.main.myEvents


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User_Event
import kotlinx.android.synthetic.main.l_main_myevent_normal.view.*
import java.text.SimpleDateFormat

class AdapterMyEvents(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterMyEvents.MainViewHolder>() {
    lateinit var items: List<Res_User_Event>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_User_Event>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_myevent_normal, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]

        requestManager.load(item.creator?.profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.img_user.layoutParams.width / 2)
            ).into(holder.view.img_user)
        holder.view.txt_creator_name.text = item.creator?.name
        holder.view.txt_event_name.text = item.name
        holder.view.txt_event_desc.text = item.description
        holder.view.txt_event_address.text = item.address
        holder.view.txt_event_date.text = SimpleDateFormat("yyyy-MM-dd").format(item.date)
        holder.view.txt_event_time.text = SimpleDateFormat("HH:mm:ss").format(item.date)
    }


    override fun getItemCount(): Int {
        return items.size
    }
}