package com.notrika.gympin.ui.main.messages.chat


import android.annotation.SuppressLint
import android.util.LayoutDirection
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_chat
import kotlinx.android.synthetic.main.l_main_messages_chat_item1.view.*
import java.text.SimpleDateFormat

class AdapterChat(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterChat.MainViewHolder>() {
    lateinit var items: List<Res_chat>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_chat>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val itemView:View = when(viewType){
            0-> LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_main_messages_chat_item1, parent,false)
            else-> LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_main_messages_chat_item2, parent,false)
        }
        return MainViewHolder(itemView)
    }

    @SuppressLint("WrongConstant")
    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view._txt_text.text = item.text
        holder.view._txt_time.text = SimpleDateFormat("HH:mm").format(item.date)
        if(item.userId!=0){
            holder.itemView.layoutDirection = LayoutDirection.LTR
        }
    }

    override fun getItemViewType(position: Int): Int {
        return items[position].userId
    }

    override fun getItemCount(): Int {
        return items.size
    }
}