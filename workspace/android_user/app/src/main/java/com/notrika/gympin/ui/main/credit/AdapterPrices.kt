package com.notrika.gympin.ui.main.credit


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_message
import com.notrika.gympin.data.model.res.Res_market
import kotlinx.android.synthetic.main.l_creadit_increase_item.view.*

class AdapterPrices() : RecyclerView.Adapter<AdapterPrices.MainViewHolder>() {
    lateinit var items: List<String>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<String>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_creadit_increase_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.txt_price.text = item
    }


    override fun getItemCount(): Int {
        return items.size
    }
}