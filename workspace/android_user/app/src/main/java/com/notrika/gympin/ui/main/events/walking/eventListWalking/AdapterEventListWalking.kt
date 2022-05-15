package com.notrika.gympin.ui.main.events.walking.eventListWalking


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.util.extention.getMiniAddress
import com.notrika.gympin.util.extention.toPersianDate
import kotlinx.android.synthetic.main.l_sport_event.view.*
import saman.zamani.persiandate.PersianDate
import saman.zamani.persiandate.PersianDateFormat

class AdapterEventListWalking(val requestManager: RequestManager) : RecyclerView.Adapter<AdapterEventListWalking.MainViewHolder>() {
    lateinit var items: List<Res_evets_walking>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_evets_walking>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_sport_event, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]
        holder.view.txt_event_name.text = item.title
        holder.view.txt_user_name.text = item.owner?.username?:"نامشخص"
        holder.view.rb_owner_rate.rating = item.owner?.rate?:5f
        holder.view.txt_event_address.text = item.address.getMiniAddress()
        var pd = item.startDate.toPersianDate()
        holder.view.txt_event_date.text = "${pd.shDay} ${pd.monthName()}"
        holder.view.txt_event_time.text = PersianDateFormat("H:i").format(pd)
        item.participants?.let { holder.view.cl_user_list.setParticipants(it,requestManager) }
        holder.itemView.setOnClickListener {
            onEventSelectListener.click(item)
        }

    }
    lateinit var onEventSelectListener:OnEventSelectListener
    interface OnEventSelectListener{
        fun click(item:Res_evets_walking)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}