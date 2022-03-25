package com.notrika.gympin.ui.main.notifs


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_notification
import kotlinx.android.synthetic.main.l_main_notifs_item.view.*
import java.text.SimpleDateFormat

class AdapterNotifs(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterNotifs.MainViewHolder>() {
    lateinit var items: List<Res_notification>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_notification>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_notifs_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view._txt_title.text = item.title
        holder.view._txt_desc.text = item.description
        holder.view._txt_time.text = SimpleDateFormat("HH:mm").format(item.date)
        holder.view.setOnClickListener {
            this.onItemClickListener.click(item)
        }
    }


    override fun getItemCount(): Int {
        return items.size
    }
    lateinit var onItemClickListener:OnItemClickListener
    interface OnItemClickListener{
        fun click(item:Res_notification)
    }
}