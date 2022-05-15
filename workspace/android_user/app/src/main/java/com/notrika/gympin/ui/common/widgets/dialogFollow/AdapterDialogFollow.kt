package com.notrika.gympin.ui.common.widgets.dialogFollow

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User
import kotlinx.android.synthetic.main.l_follow_user_item.view.*

class AdapterDialogFollow(var requestManager: RequestManager) : RecyclerView.Adapter<AdapterDialogFollow.FollowViewHolder>() {

    inner class FollowViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    var items: List<Res_User> = arrayListOf()
        get() {
            return field
        }
        set(value) {
        field = value
        notifyDataSetChanged()
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FollowViewHolder {

        var itemView: View =
            LayoutInflater.from(parent.context)
                .inflate(R.layout.l_follow_user_item, parent, false)
        return FollowViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: FollowViewHolder, position: Int) {
        requestManager.load(items[position].profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.img_user_picture.layoutParams.width / 2)
            )
            .into(holder.view.img_user_picture)

        holder.view.txt_user_name.text = items[position].username
        holder.itemView.setOnClickListener {
            onUserListItemClickListener?.Click(items[position])
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    var onUserListItemClickListener: OnUserListItemClickListener? = null

    interface OnUserListItemClickListener{
        fun Click(item:Res_User)
    }

}