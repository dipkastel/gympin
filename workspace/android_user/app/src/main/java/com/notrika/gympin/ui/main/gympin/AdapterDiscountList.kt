package com.notrika.gympin.ui.main.gympin

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_Home_Page_Items
import kotlinx.android.synthetic.main.l_main_gympin_discount_list_item.view.*

class AdapterDiscountList : RecyclerView.Adapter<AdapterDiscountList.ViewHolder>() {

    inner class ViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    lateinit var items: List<Res_Home_Page_Items>

    fun addItems(_items: List<Res_Home_Page_Items>) {
        this.items = _items
        notifyDataSetChanged()
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        var itemView:View =
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_discount_list_item, parent,false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        Glide.with(holder.view).load(items[position].imageUrl)
            .placeholder(R.drawable.placeholder_banners)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.resources.getDimension(R.dimen.const_corner_radius).toInt())
            )
            .into(holder.view.img_post_image)

        holder.view.txt_discount_title.text = items[position].description
        holder.view.txt_discount_place_name.text = items[position].title
        holder.itemView.setOnClickListener {
            onDiscountClick.click(items[position])
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }


    lateinit var onDiscountClick: DiscountClickListener

    interface DiscountClickListener{
        fun click(item:Res_Home_Page_Items)
    }
}