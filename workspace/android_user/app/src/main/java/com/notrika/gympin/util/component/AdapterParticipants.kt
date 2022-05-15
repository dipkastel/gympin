package com.notrika.gympin.util.component


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.core.view.marginEnd
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.comon.Participant
import com.notrika.gympin.data.model.res.Res_User
import kotlinx.android.synthetic.main.l_participants_item.view.*
import kotlinx.android.synthetic.main.l_sport_event.view.*


class AdapterParticipants(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterParticipants.MainViewHolder>() {
    lateinit var items: List<Res_User>
    var visibleCount = 2

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_User>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_participants_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        when(position){
            in 0..visibleCount->{

            }
            visibleCount->{
                val lp = holder.itemView.layoutParams as LinearLayout.LayoutParams
                lp.marginEnd = 0
                holder.itemView.layoutParams = lp
                holder.view.cl_participant_count.visibility = View.VISIBLE
                holder.view.img_user_image.visibility = View.GONE
                holder.view.txt_participant_extra_couont.text = "${items.count()-visibleCount}+"

            }
            else->{
                holder.itemView.visibility = View.GONE
            }
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }
}