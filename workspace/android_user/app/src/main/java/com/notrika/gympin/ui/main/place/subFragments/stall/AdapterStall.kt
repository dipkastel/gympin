package com.notrika.gympin.ui.main.place.subFragments.stall


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_reserve
import kotlinx.android.synthetic.main.l_place_reserve_item.view.*

class AdapterStall(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterStall.MainViewHolder>() {
    lateinit var items: List<mock_reserve>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<mock_reserve>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_place_reserve_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.title.text = item.name
        holder.view.price.text = item.price.toString()
        holder.view.setOnClickListener {
            this.onItemClickListener.click(item)
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }
    lateinit var onItemClickListener:OnItemClickListener
    interface OnItemClickListener{
        fun click(item:mock_reserve)
    }
}