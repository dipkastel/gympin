package com.notrika.gympin.ui.main.gympin


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_Home_Page
import kotlinx.android.synthetic.main.l_main_gympin_banner.view.*
import kotlinx.android.synthetic.main.l_main_gympin_discount_list.view.*
import kotlinx.android.synthetic.main.l_main_gympin_slider.view.*
import kotlinx.android.synthetic.main.l_main_gympin_title.view.*
import kotlinx.android.synthetic.main.l_main_gympin_user_list.view.*

class AdapterGympinMain(val requestManager: RequestManager,val adapterSlider: AdapterSlider,val adapterContentList: AdapterContentList,val adapterDiscountList: AdapterDiscountList,var adapterUserList: AdapterUserList) : RecyclerView.Adapter<AdapterGympinMain.MainViewHolder>() {
    lateinit var items: List<Res_Home_Page>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(homeItems: List<Res_Home_Page>) {
        this.items = homeItems
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        var itemView:View = viewType.let {

            when(viewType){
                0->{
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_title, parent,false)
                }
                1->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_slider, parent,false)
                }
                2->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_banner, parent,false)
                }
                3->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_user_list, parent,false)
                }
                4->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_user, parent,false)
                }
                5->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_content_list, parent,false)
                }
                6->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_discount_list, parent,false)
                }
                7->{

                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_content, parent,false)
                }
                8->{

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_discount, parent,false)
                }
                else->{
                     LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_discount, parent,false)
                }
            }

        }
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        when(getItemViewType(position)){
            0->{
                items[position].items?.get(0)?.title.let {
                    holder.view.txt_title.text = it
                }
            }
            1->{
                adapterSlider.addItems(items[position].items!!)
                holder.view.Slider.adapter = adapterSlider
            }
            2->{
                items[position].items?.get(0)?.imageUrl.let {
                    requestManager.load(it)
                        .placeholder(R.drawable.placeholder_banners)
                        .transform(
                            CenterCrop(), RoundedCorners(holder.view.resources.getDimension(R.dimen.const_corner_radius).toInt())
                        ).into(holder.view.img_banner)
                }
            }
            3->{
                adapterUserList.addItems(items[position].items!!)
                holder.view.rv_user_list.adapter = adapterUserList
            }
            4->{
            }
            5->{
                adapterContentList.addItems(items[position].items!!)
                holder.view.rv_discount_list.adapter = adapterContentList
            }
            6->{
                adapterDiscountList.addItems(items[position].items!!)
                holder.view.rv_discount_list.adapter = adapterDiscountList
            }
            7->{
            }
            8->{
            }
            else->{
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        when(items[position].type){
            "title"->return 0
            "slider"->return 1
            "banner"->return 2
            "user_list"->return 3
            "single_user"->return 4
            "content_list"->return 5
            "discount_list"->return 6
            "single_content"->return 7
            "single_discount"->return 8
        }
        return super.getItemViewType(position)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}