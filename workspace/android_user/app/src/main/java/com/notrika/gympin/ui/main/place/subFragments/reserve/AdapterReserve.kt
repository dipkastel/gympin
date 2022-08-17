package com.notrika.gympin.ui.main.place.subFragments.reserve


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_reserve
import kotlinx.android.synthetic.main.l_place_reserve_item.view.*

class AdapterReserve(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterReserve.MainViewHolder>() {
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
        holder.view.btn_reserve.setOnClickListener {
            this.onReserve?.reserve(item)
        }
    }


    override fun getItemCount(): Int {
        return items.size
    }
    var onReserve:OnReserve? = null
    interface OnReserve{
        fun reserve(item:mock_reserve)
    }
}
