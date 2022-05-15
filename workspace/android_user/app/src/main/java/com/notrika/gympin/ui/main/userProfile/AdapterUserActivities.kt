package com.notrika.gympin.ui.main.userProfile


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_base_evets
import kotlinx.android.synthetic.main.l_main_profile_user_events.view.*

class AdapterUserActivities(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterUserActivities.MainViewHolder>() {
    lateinit var items: List<Pair<String,List<Res_base_evets>>>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: ArrayList<Res_base_evets>) {
        this.items = _items.groupBy { o->o.sport?.name.toString() }.toList()
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val itemView:View = LayoutInflater.from(parent.context)
                .inflate(R.layout.l_main_profile_user_events , parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
            var item = items[position]
            holder.view.txt_title.text = "شرکت در ${item.second.size} ایونت ${item.first}"
    }


    override fun getItemCount(): Int {
        return items.size
    }

    override fun getItemViewType(position: Int): Int {
        return super.getItemViewType(position)
    }
}