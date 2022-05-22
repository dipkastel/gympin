package com.notrika.gympin.util.component.map


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.l_c_map_address.view.*

class AdapterMapAddress() : RecyclerView.Adapter<AdapterMapAddress.MainViewHolder>() {
    var itemEntities: ArrayList<MapItemEntity> = ArrayList()

    fun addItem(itemEntity :MapItemEntity){
        itemEntities.add(itemEntity)
        notifyDataSetChanged()
    }


    fun removeItem(itemEntity :MapItemEntity){
        itemEntities.remove(itemEntities.filter { p->p.geoPoint?.latitude == itemEntity.geoPoint?.latitude }.firstOrNull())
        notifyDataSetChanged()
    }

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_c_map_address, parent, false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        var item = itemEntities[position]
        holder.view.txt_address.text = item.address
        holder.view.txt_close.setOnClickListener {
            this.onItemClickListener?.click(item)
        }
    }


    override fun getItemCount(): Int {
        return itemEntities.size
    }
    var onItemClickListener: OnItemClickListener? = null

    interface OnItemClickListener {
        fun click(itemEntity: MapItemEntity)
    }
}