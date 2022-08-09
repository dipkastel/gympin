package com.notrika.gympin.ui.main.places.list

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_place
import kotlinx.android.synthetic.main.l_main_place_item.view.*

class AdapterPlacesList : RecyclerView.Adapter<AdapterPlacesList.ViewHolder>() {

    inner class ViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    lateinit var items: List<mock_place>
    fun addItems(_items: List<mock_place>) {
        this.items = _items
        notifyDataSetChanged()
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        var itemView:View =
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_place_item, parent,false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        Glide.with(holder.view).load(items[position].image)
            .placeholder(R.drawable.placeholder_profile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.resources.getDimension(R.dimen.const_corner_radius).toInt())
            )
            .into(holder.view.img_place)

        holder.view.txt_title.text = items[position].name
        holder.view.txt_desc.text = items[position].address
        holder.view.txt_sub_desc.text = items[position].sports!!.joinToString(",")
        holder.itemView.setOnClickListener {
            onPlaceClick?.Click(items[position])
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }


    var onPlaceClick: OnPlaceClickListener? = null

    interface OnPlaceClickListener{
       fun Click(item:mock_place)
    }


}