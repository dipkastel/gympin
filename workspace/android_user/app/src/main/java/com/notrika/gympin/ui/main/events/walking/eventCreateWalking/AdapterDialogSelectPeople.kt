package com.notrika.gympin.ui.main.events.walking.eventCreateWalking


import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User
import kotlinx.android.synthetic.main.l_dialog_user.view.*
import kotlinx.android.synthetic.main.l_main_add_contact_title.view.*

class AdapterDialogSelectPeople(val requestManager: RequestManager) :
    RecyclerView.Adapter<AdapterDialogSelectPeople.MainViewHolder>() {
     var contacts: HashMap<String, String>? = null
     var followings: List<Res_User>? =null

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addContacts(_items: HashMap<String, String>) {
        this.contacts = _items
    }

    fun addFollwings(_items: List<Res_User>) {
        this.followings = _items
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val itemView: View = when (viewType) {
            types.TITLE.id -> {
                LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_main_add_contact_title, parent, false)
            }
            types.FOLLOWINGS.id -> {
                LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_dialog_user, parent, false)
            }
            types.CONTACTS.id -> {
                LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_dialog_user, parent, false)
            }
            types.NONE.id -> {
                LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_main_add_contact_title, parent, false)
            }
            else -> {
                LayoutInflater.from(parent.context)
                    .inflate(R.layout.l_main_add_contact_title, parent, false)
            }
        }
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        when (position) {
            0 -> {
                holder.view.txt_title.text = "دنبال کنندگان"
            }
            in 0..(followings?.size?:0) -> {
                var item = followings!!.toList()[position - 1]
                holder.view.txt_user_name.text = item.username
                holder.view.txt_phone_number.text = item.bio
                holder.view.txt_btn_invite.visibility = View.GONE
                holder.itemView.setOnClickListener {
                    onUserSelectListener?.clickOnfollowing(item)
                }
            }
            (followings?.size?:0) + 1 -> {
                holder.view.txt_title.text = "مخاطبین"
            }
            in (followings?.size?:0) + 2..(contacts?.size?:0) + (followings?.size?:0) + 2 -> {

                holder.view.txt_btn_invite.visibility = View.VISIBLE
                var item = contacts!!.toList()[position -( (followings?.size?:0) + 2)]
                holder.view.txt_user_name.text = item.first
                holder.view.txt_phone_number.text = item.second
                holder.itemView.setOnClickListener {
                    onUserSelectListener?.clickOnContact(item.first, item.second)
                }
            }

            else -> {
                0
            }
        }

    }

    var onUserSelectListener: OnEventSelectListener? = null

    interface OnEventSelectListener {
        fun clickOnfollowing(item: Res_User)
        fun clickOnContact(name: String, PhoneNumber: String)
    }

    override fun getItemViewType(position: Int): Int {
        return when (position) {
            0 -> {
                types.TITLE.id
            }
            in 0..(followings?.size?:0) -> {
                types.FOLLOWINGS.id
            }
            followings?.size?:0 + 1 -> {
                types.TITLE.id
            }
            in (followings?.size?:0) + 2..(contacts?.size?:0) + (followings?.size?:0) + 2 -> {
                types.CONTACTS.id
            }
            else -> {
                0
            }
        }
    }

    override fun getItemCount(): Int {
        return (contacts?.size?:0) + (followings?.size?:0) + 2
    }

    private enum class types(var id: Int) {
        NONE(0), TITLE(1), FOLLOWINGS(2), CONTACTS(3)
    }
}