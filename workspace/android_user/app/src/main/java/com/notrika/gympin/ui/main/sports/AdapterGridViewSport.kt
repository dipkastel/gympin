package com.notrika.gympin.ui.main.sports

import android.app.Activity
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.ViewCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterInside
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.res.Res_sport
import kotlinx.android.synthetic.main.item_grid_sport.view.*

class AdapterGridViewSport(var context: Activity?, private val mValues: List<Res_sport>, var requestManager: RequestManager, var pocket: Pocket) : RecyclerView.Adapter<AdapterGridViewSport.ViewHolder>() {

    private val mBackground: Int

    class ViewHolder(val mView: View) : RecyclerView.ViewHolder(mView) {
        var _sport_title: TextView
        var _image_view: ImageView

        init {
            _sport_title = mView._sport_title
            _image_view = mView._image_view
        }
    }

    init {
        val mTypedValue = TypedValue()
        context?.theme?.resolveAttribute(R.attr.selectableItemBackground, mTypedValue, true)
        mBackground = mTypedValue.resourceId
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.item_grid_sport, parent, false)
        view.setBackgroundResource(mBackground)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder._sport_title.text = mValues[position].name

//        if (mValues[position].status=="Active")
        if(mValues[position].LogoIds.any())
            requestManager
                .load("http://api.gympin.ir/v1/multimedia/getById?id=${mValues[position].LogoIds?.first()?: ""}&height=200")
                .placeholder(R.drawable.ic_launcher)
                .transform(CenterInside(), RoundedCorners(holder._image_view.resources.getDimension(R.dimen.const_corner_radius).toInt()))
                .into(holder._image_view)

        val anim = AnimationUtils.loadAnimation(holder.itemView.context, R.anim.enter_zoom)
//        anim.startOffset = 100.toLong()
        holder.itemView.animation = anim

        ViewCompat.setTransitionName(holder._image_view, mValues[position].name)
        holder.itemView.setOnClickListener {
            onitemClickLictener?.Click(holder._image_view, mValues[position])
        }
    }

    override fun getItemCount(): Int {
        return mValues.size
    }

    var onitemClickLictener: OnSportClickListener? = null
}