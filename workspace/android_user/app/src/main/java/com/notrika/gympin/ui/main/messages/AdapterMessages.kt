package com.notrika.gympin.ui.main.messages


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_message
import kotlinx.android.synthetic.main.l_main_messages_item.view.*
import java.text.SimpleDateFormat

class AdapterMessages(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterMessages.MainViewHolder>() {
    lateinit var items: List<Res_message>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_message>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_messages_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view._txt_title.text = item.title
        holder.view._txt_desc.text = item.description
        holder.view._txt_time.text = SimpleDateFormat("HH:mm").format(item.date)
        holder.itemView.setOnClickListener(View.OnClickListener {
            this.chatClickListener.ChatClick(item)
        })
    }


    override fun getItemCount(): Int {
        return items.size
    }

    fun setGotoChatListener(listener:ChatClickListener) {
        chatClickListener = listener
    }
    lateinit var chatClickListener:ChatClickListener
    interface ChatClickListener{
        fun ChatClick(item:Res_message)
    }
}