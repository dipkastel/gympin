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
import kotlinx.android.synthetic.main.l_main_gympin_content_list_item.view.*
import kotlinx.android.synthetic.main.l_main_gympin_discount_list_item.view.img_post_image

class AdapterContentList : RecyclerView.Adapter<AdapterContentList.ViewHolder>() {

    inner class ViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    lateinit var items: List<Res_Home_Page_Items>
    fun addItems(_items: List<Res_Home_Page_Items>) {
        this.items = _items
        notifyDataSetChanged()
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        var itemView:View =
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_content_list_item, parent,false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        Glide.with(holder.view).load(items[position].imageUrl)
            .placeholder(R.drawable.placeholder_banners)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.resources.getDimension(R.dimen.const_corner_radius).toInt())
            )
            .into(holder.view.img_post_image)

        holder.view.txt_user_name.text = items[position].title
        holder.itemView.setOnClickListener {
            onContentClick.Click(items[position])
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }


    lateinit var onContentClick: OnContentClickListener

    interface OnContentClickListener{
       fun Click(item:Res_Home_Page_Items)
    }


}