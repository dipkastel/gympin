package com.notrika.gympin.ui.main.tickets


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.entity.mock_ticket
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.util.extention.getMiniAddress
import com.notrika.gympin.util.extention.toPersianDate
import kotlinx.android.synthetic.main.l_main_myevent_normal.view.*
import saman.zamani.persiandate.PersianDateFormat

class AdapterTickets(val requestManager: RequestManager, var pocket: Pocket) :
    RecyclerView.Adapter<AdapterTickets.MainViewHolder>() {
    lateinit var items: List<mock_ticket>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: List<mock_ticket>) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_tickets_list_item, parent, false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = items[position]



    }


    var onEvenetClickListener: OnEvenetClickListener? = null

    interface OnEvenetClickListener {
        fun close(ticket: mock_ticket)
        fun reCreate(ticket: mock_ticket)
        fun getQr(ticket: mock_ticket)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}
