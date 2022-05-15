package com.notrika.gympin.ui.main.events.walking.eventCreateWalking


import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.res.Res_User
import kotlinx.android.synthetic.main.l_event_user_item.view.*


class AdapterEventListWalkingPeople(val requestManager: RequestManager,var inactivity:Activity,var pocket: Pocket,var followings: List<Res_User>) : RecyclerView.Adapter<AdapterEventListWalkingPeople.MainViewHolder>() {
    var items: Int = 0
    var peoples: ArrayList<Res_User> =ArrayList()

    inner class MainViewHolder(var view: View) : RecyclerView.ViewHolder(view)

    fun addItems(_items: Int) {
        this.items = _items
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {

        val itemView:View = LayoutInflater.from(parent.context)
            .inflate(R.layout.l_event_user_item, parent,false)
        return MainViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        if(peoples.size<items){
            var newUser  = Res_User()
            peoples.add(newUser)
        }

        if(position==0) {
            holder.view.img_user_container.setImageResource(R.drawable._circle_bg_red);
            holder.view.rb_user_rate.visibility = View.VISIBLE
            holder.view.rb_user_rate.rating = 2.6f
            holder.view.txt_name.text = pocket.userName


        }else{
            var item = peoples[position]
            holder.view.txt_name.text = item.username
            holder.itemView.setOnClickListener {
                onEventSelectListener.click(peoples[position])
                var dialog = DialogSelectPeople(inactivity,requestManager,"انتخاب همراه $position",followings)
                dialog.show()
                dialog.setUserSelectListener(object :AdapterDialogSelectPeople.OnEventSelectListener{
                    override fun clickOnfollowing(item: Res_User) {
                        item.also { peoples[position] = it }
                        dialog.dialog.dismiss()
                        notifyDataSetChanged()
                    }

                    override fun clickOnContact(name: String, PhoneNumber: String) {

                        val shareBody = String.format(inactivity.getString(R.string.inviteFriendBySms),name)
                        val uri = Uri.parse("smsto:$PhoneNumber")
                        val it = Intent(Intent.ACTION_SENDTO, uri)
                        it.putExtra("sms_body", shareBody)
                        inactivity.startActivity(it)
                        dialog.dialog.dismiss()
                    }

                })
            }
        }
    }
    lateinit var onEventSelectListener:OnEventSelectListener

    interface OnEventSelectListener{
        fun click(item:Res_User)
    }

    override fun getItemCount(): Int {
        return items
    }
}