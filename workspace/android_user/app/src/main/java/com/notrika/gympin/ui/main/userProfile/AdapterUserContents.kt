package com.notrika.gympin.ui.main.userProfile


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_content
import kotlinx.android.synthetic.main.l_main_profile_content1.view.*
import kotlinx.android.synthetic.main.l_main_profile_content2.view.*
import kotlin.math.ceil

class AdapterUserContents(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterUserContents.MainViewHolder>() {
    lateinit var items: List<Res_content>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_content>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val itemView:View = LayoutInflater.from(parent.context)
                .inflate(if(viewType==0) R.layout.l_main_profile_content1 else R.layout.l_main_profile_content2, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        if (position%2==0){
            var item = items[position*2]
            requestManager.load(item.image)
                .placeholder(R.drawable.placeholder_banners).into(holder.view.img_item1)
            holder.view.txt_title1.text = item.user?.name

            try{
                item = items[position*2+1]
                requestManager.load(item.image)
                    .placeholder(R.drawable.placeholder_banners).into(holder.view.img_item2)
                holder.view.txt_title2.text = item.user?.name

            }catch (e:Exception){
                holder.view.card_2.visibility = View.INVISIBLE
            }
        }else{

            var item = items[position*2]
            requestManager.load(item.image)
                .placeholder(R.drawable.placeholder_banners).into(holder.view.img_item3)
            holder.view.txt_title3.text = item.user?.name
            try{
                item = items[position*2+1]
                requestManager.load(item.image)
                    .placeholder(R.drawable.placeholder_banners).into(holder.view.img_item4)
                holder.view.txt_title4.text = item.user?.name

            }catch (e:Exception){
                holder.view.card_4.visibility = View.INVISIBLE
            }

        }
    }


    override fun getItemCount(): Int {
        var itemCount = ceil(items.size.div(2.0)).toInt()
        return itemCount
    }

    override fun getItemViewType(position: Int): Int {
        return position%2
    }
}