package com.notrika.gympin.util.component.map

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.c_full_screen_map.view.*


class FullScreenMapDialog(var baseimapUse: ImapUse,var context: Context,var poinsCount:Int) :IMapActions {

    private lateinit var dialog: Dialog
    private lateinit var view: View
    private lateinit var adapter: AdapterMapAddress
     var onfinishListener: OnSubmitListener? = null
    lateinit var imapUse: ImapUse



    fun show() {
        val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        view = inflater.inflate(R.layout.c_full_screen_map, null)

        dialog = Dialog(context, R.style.baseDialog)
        dialog.setContentView(view)
        dialog.show()

        adapter = AdapterMapAddress()

        imapUse = MapUseImpl(this,view._full_map,poinsCount)
        view.rv_address.adapter = adapter

        view.btn_submit.setOnClickListener {

            if (imapUse.getSelectedPoints().count() == poinsCount) {
                dialog.dismiss()
                onfinishListener?.submit(imapUse.getSelectedPoints())
            }
        }
        adapter.onItemClickListener = object : AdapterMapAddress.OnItemClickListener {
            override fun click(itemEntity: MapItemEntity) {

                imapUse.removePoint(itemEntity)
                adapter.removeItem(itemEntity)
                settitle()
            }
        }
        baseimapUse.getSelectedPoints().forEach{
            imapUse.addPoint(it)
        }
    }

    private fun settitle() {

        view.txt_title.text =
            when {
                (imapUse.getSelectedPoints().count() < 1) -> context.getString(R.string.select_start_point)
                (imapUse.getSelectedPoints().count() < 2) -> context.getString(R.string.select_end_point)
                else -> context.getString(R.string.submit_points)
            }
    }

    override fun getcontext(): Context {
        return context
    }

    override fun setAddress(item: MapItemEntity) {
        settitle()
        adapter.addItem(item)
    }

    override fun invalidateView() {
        dialog.invalidateOptionsMenu()
    }
}
