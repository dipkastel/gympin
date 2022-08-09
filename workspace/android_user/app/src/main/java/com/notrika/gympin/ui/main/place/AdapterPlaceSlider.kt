package com.notrika.gympin.ui.main.place

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.l_main_gympin_slider_item.view.*

class AdapterPlaceSlider : RecyclerView.Adapter<AdapterPlaceSlider.sliderViewHolder>() {

    inner class sliderViewHolder(var view: View) : RecyclerView.ViewHolder(view)
    lateinit var items: List<String>

    fun addItems(_items: List<String>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): sliderViewHolder {

        var itemView:View =
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_slider_item, parent,false)
        return sliderViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: sliderViewHolder, position: Int) {
        Glide.with(holder.view).load(items[position])
            .placeholder(R.drawable.placeholder_banners)
            .into(holder.view.img_slider)
        holder.itemView.setOnClickListener {
            onSliderItemClickListener?.Click(items[position])
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    var onSliderItemClickListener: OnSliderItemClickListener? = null

    interface OnSliderItemClickListener{
        fun Click(item:String)
    }
}