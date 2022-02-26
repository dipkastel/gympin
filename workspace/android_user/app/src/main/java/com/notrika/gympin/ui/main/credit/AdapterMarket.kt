package com.notrika.gympin.ui.main.credit


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_market
import kotlinx.android.synthetic.main.l_creadit_market_item.view.*

class AdapterMarket(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterMarket.MainViewHolder>() {
    lateinit var items: List<Res_market>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_market>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_creadit_market_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.txt_price.text ="ارزش ${item.price} تومان"
        holder.view.txt_title.text =item.title
        holder.view.txt_cost.text ="${item.coin} سکه"
        requestManager.load(item.image)
            .placeholder(R.drawable.placeholder_banners).into(holder.view.img_banner)
    }


    override fun getItemCount(): Int {
        return items.size
    }
}