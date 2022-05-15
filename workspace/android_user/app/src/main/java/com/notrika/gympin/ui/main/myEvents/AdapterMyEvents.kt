package com.notrika.gympin.ui.main.myEvents


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.util.extention.getMiniAddress
import com.notrika.gympin.util.extention.toPersianDate
import kotlinx.android.synthetic.main.l_main_myevent_normal.view.*
import saman.zamani.persiandate.PersianDateFormat

class AdapterMyEvents(val requestManager: RequestManager, var pocket: Pocket) :
    RecyclerView.Adapter<AdapterMyEvents.MainViewHolder>() {
    lateinit var items: List<Res_evets_walking>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<Res_evets_walking>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_main_myevent_normal, parent, false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]

        requestManager.load(item.owner?.profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(
                CenterCrop(), RoundedCorners(holder.view.img_owner_image.layoutParams.width / 2)
            ).into(holder.view.img_owner_image)
        holder.view.txt_creator_name.text = item.owner?.username
        item.owner?.rate.let {
                holder.view.rb_user_rate.rating = it?:5f
        }
        holder.view.txt_event_name.text = item.title
        holder.view.txt_event_desc.text = item.description
        var adress = item.address.getMiniAddress()
        holder.view.txt_event_address.text = adress

        var pd = item.startDate.toPersianDate()
        holder.view.txt_event_date.text = "${pd.shDay} ${pd.monthName()}"
        holder.view.txt_event_time.text = PersianDateFormat("H:i").format(pd)
        holder.view.cl_user_list.setParticipants(item.participants!!, requestManager)
        var toStart = (1000 * 60 * 60 * 24 * 3)
        var eventTime = (1000 * 60 * 60 * 1)
        var now = System.currentTimeMillis()
        var delta =(now+toStart) -item.startDate.toPersianDate().time
        when (toStart - delta) {
            in Long.MIN_VALUE .. 0->{
                //finished
                holder.view.bar_event_time.setindicatorProgress(0f)
                holder.view.bar_event_time.setindicatorTitle("تمام شد")
            }
            in 0..eventTime -> {
                //started
                holder.view.bar_event_time.setindicatorProgress(0f)
                holder.view.bar_event_time.setindicatorTitle(((toStart - delta)/(1000*60)).toString()+" دقیقه مانده")
            }
            in eventTime..toStart -> {
                //to start
                holder.view.bar_event_time.setindicatorProgress((toStart - delta).toFloat()/toStart)
                holder.view.bar_event_time.setindicatorTitle(((toStart - delta)/(1000*60*60)).toString()+" ساعت مانده")
            }
            in toStart..Int.MAX_VALUE->{
                //start later
                holder.view.bar_event_time.setindicatorProgress(1f)
                holder.view.bar_event_time.setindicatorTitle("شروع نشد")
            }

        }
        if (item.owner?.id == pocket.userId) {
            holder.view.img_event_is_mine.visibility = View.VISIBLE
        } else {
            holder.view.img_event_is_mine.visibility = View.GONE
        }
        holder.itemView.setOnClickListener {
            onEvenetClickListener?.click(item)
        }
        holder.view.cl_share.setOnClickListener {
            onEvenetClickListener?.share(item)
        }

    }


    var onEvenetClickListener: OnEvenetClickListener? = null

    interface OnEvenetClickListener {
        fun click(event: Res_evets_walking)
        fun share(event: Res_evets_walking)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}
