package com.notrika.gympin.ui.main.contents


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_content
import kotlinx.android.synthetic.main.l_main_content_list_item_image.view.*
import java.text.SimpleDateFormat

class AdapterContents(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterContents.MainViewHolder>() {
    lateinit var items: List<Res_content>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_content>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_content_list_item_image, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]

        requestManager.load(item.user?.profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.img_user_image.layoutParams.width / 2)
            ).into(holder.view.img_user_image)

        requestManager.load(item.image)
            .placeholder(R.drawable.placeholder_banners)
            .transform(
                CenterCrop(), RoundedCorners(10)
            ).into(holder.view.img_post_image)

        holder.view.txt_user_name.text = item.user?.name
        holder.view.txt_date.text = SimpleDateFormat("yyyy-MM-dd").format(item.date)
        holder.view.txt_content_title.text = item.title
        holder.view.txt_content_description.text = item.description
    }


    override fun getItemCount(): Int {
        return items.size
    }
}