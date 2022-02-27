package com.notrika.gympin.ui.main.gympin


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.enum.MainItemTypes
import com.notrika.gympin.data.model.entity.Home_Item
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_Home_Page_Items
import kotlinx.android.synthetic.main.l_main_gympin_banner.view.*
import kotlinx.android.synthetic.main.l_main_gympin_discount_list.view.*
import kotlinx.android.synthetic.main.l_main_gympin_slider.view.*
import kotlinx.android.synthetic.main.l_main_gympin_title.view.*
import kotlinx.android.synthetic.main.l_main_gympin_user_list.view.*

class AdapterGympinMain(
    val requestManager: RequestManager,
    val adapterSlider: AdapterSlider,
    val adapterContentList: AdapterContentList,
    val adapterDiscountList: AdapterDiscountList,
    var adapterUserList: AdapterUserList
) : RecyclerView.Adapter<AdapterGympinMain.MainViewHolder>() {
    lateinit var items: List<Res_Home_Page>

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(homeItems: List<Res_Home_Page>) {
        this.items = homeItems
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        var itemView: View = viewType.let {

            when (viewType) {
                MainItemTypes.title.typeNumber -> {
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_title, parent, false)
                }
                MainItemTypes.slider.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_slider, parent, false)
                }
                MainItemTypes.banner.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_banner, parent, false)
                }
                MainItemTypes.user_list.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_user_list, parent, false)
                }
                MainItemTypes.single_user.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_user, parent, false)
                }
                MainItemTypes.content_list.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_content_list, parent, false)
                }
                MainItemTypes.discount_list.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_discount_list, parent, false)
                }
                MainItemTypes.single_content.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_content, parent, false)
                }
                MainItemTypes.single_discount.typeNumber -> {

                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_discount, parent, false)
                }
                else -> {
                    LayoutInflater.from(parent.context)
                        .inflate(R.layout.l_main_gympin_single_discount, parent, false)
                }
            }

        }
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {

        when (getItemViewType(position)) {
            MainItemTypes.title.typeNumber -> {
                items[position].items?.get(0)?.title.let {
                    holder.view.txt_title.text = it
                }
                holder.itemView.setOnClickListener {
                    onItemClickListener.Click(
                        items[position]
                    )
                }
            }
            MainItemTypes.slider.typeNumber -> {
                adapterSlider.addItems(items[position].items!!)
                holder.view.Slider.adapter = adapterSlider
                adapterSlider.onSliderItemClickListener =
                    object : AdapterSlider.OnSliderItemClickListener {
                        override fun Click(item: Res_Home_Page_Items) {
                            onItemClickListener.Click(
                                item
                            )
                        }
                    }
            }
            MainItemTypes.banner.typeNumber -> {
                items[position].items?.get(0)?.imageUrl.let {
                    requestManager.load(it)
                        .placeholder(R.drawable.placeholder_banners)
                        .transform(
                            CenterCrop(),
                            RoundedCorners(
                                holder.view.resources.getDimension(R.dimen.const_corner_radius)
                                    .toInt()
                            )
                        ).into(holder.view.img_banner)
                }
                holder.itemView.setOnClickListener {
                    onItemClickListener.Click(
                        items[position]
                    )
                }
            }
            MainItemTypes.user_list.typeNumber -> {
                adapterUserList.addItems(items[position].items!!)
                holder.view.rv_user_list.adapter = adapterUserList
                adapterUserList.onUserListItemClickListener =
                    object : AdapterUserList.OnUserListItemClickListener {
                        override fun Click(item: Res_Home_Page_Items) {
                            onItemClickListener.Click(
                                item
                            )
                        }

                    }
            }
            MainItemTypes.single_user.typeNumber -> {
                holder.itemView.setOnClickListener {
                    onItemClickListener.Click(
                        items[position]
                    )
                }
            }
            MainItemTypes.content_list.typeNumber -> {
                adapterContentList.addItems(items[position].items!!)
                holder.view.rv_discount_list.adapter = adapterContentList
                adapterContentList.onContentClick =
                    object : AdapterContentList.OnContentClickListener {
                        override fun Click(item: Res_Home_Page_Items) {
                            onItemClickListener.Click(
                                item
                            )
                        }
                    }
            }
            MainItemTypes.discount_list.typeNumber -> {
                adapterDiscountList.addItems(items[position].items!!)
                holder.view.rv_discount_list.adapter = adapterDiscountList
                adapterDiscountList.onDiscountClick = object:AdapterDiscountList.DiscountClickListener {
                    override fun click(item: Res_Home_Page_Items) {
                        onItemClickListener.Click(
                            item
                        )
                    }
                }
            }
            MainItemTypes.single_content.typeNumber -> {
            }
            MainItemTypes.single_discount.typeNumber -> {
            }
            else -> {
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        return MainItemTypes.valueOf(items[position].type!!).typeNumber
    }

    override fun getItemCount(): Int {
        return items.size
    }

    lateinit var onItemClickListener: OnItemClickListener

    interface OnItemClickListener {
        fun <T : Home_Item> Click(item: T)
    }

}