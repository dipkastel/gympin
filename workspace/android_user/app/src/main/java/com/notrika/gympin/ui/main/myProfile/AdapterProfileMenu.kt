package com.notrika.gympin.ui.main.myProfile


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.l_main_profile_item.view.*

class AdapterProfileMenu(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterProfileMenu.MainViewHolder>() {
    lateinit var items: List<FragmentMyProfile.MyMenuItem>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<FragmentMyProfile.MyMenuItem>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_profile_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.txt_item_title.text = item.title
        holder.view.img_item_ico.setImageResource(item.icon)
        holder.view.setOnClickListener {
            item.Destination()
        }
    }


    override fun getItemCount(): Int {
        return items.size
    }
}