package com.notrika.gympin.ui.main.events.walking.eventWalking


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_evets_walking
import kotlinx.android.synthetic.main.l_event_user_item.view.*

class AdapterEventListWalkingPeople(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterEventListWalkingPeople.MainViewHolder>() {
    lateinit var items: Res_evets_walking

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: Res_evets_walking) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_event_user_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        if(position==0){
            holder.view.img_user_container.setImageResource(R.drawable._circle_bg_red)
            holder.view.rb_user_rate.visibility = View.VISIBLE
            holder.view.rb_user_rate.rating = items.owner?.rate?:5.0f
            holder.view.txt_name.text = items.owner?.username
            requestManager.load(items.owner?.profileImage)
                .placeholder(R.drawable.placeholder_userprofile)
                .transform(
                    CenterCrop(), RoundedCorners(holder.view.img_user_picture.layoutParams.width / 2)
                ).into(holder.view.img_user_picture)

            holder.itemView.setOnClickListener {
                    onUserSelectListener?.click(items.owner!!)
            }
        }else{
            holder.view.rb_user_rate.visibility = View.GONE
            var item =items.participants.let {
                if(it?.size!! >=position) it[position-1] else Res_User()
            }
            holder.view.txt_name.text = item.username
            requestManager.load(item.profileImage)
                .placeholder(R.drawable.placeholder_userprofile)
                .transform(
                    CenterCrop(), RoundedCorners(holder.view.img_user_picture.layoutParams.width / 2)
                ).into(holder.view.img_user_picture)


            holder.itemView.setOnClickListener {
                if(item.id!=0.toLong())
                    onUserSelectListener?.click(item)
            }
        }
    }
    var onUserSelectListener:OnUserSelectListener? = null
    interface OnUserSelectListener{
        fun click(item:Res_User)
    }

    override fun getItemCount(): Int {
        return (items.participantCount!! + 1)
    }
}