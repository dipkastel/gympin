package com.notrika.gympin.util.dialog

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.hardware.*
import android.view.LayoutInflater
import android.view.View
import android.view.ViewTreeObserver
import android.view.Window
import android.widget.LinearLayout
import androidx.annotation.CallSuper
import com.hampardaz.cinematicket.util.dialogs.CDialog
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.c_component_base_dialog.view.*


abstract class CBaseDialogContaner : CDialog {


    lateinit var dialog: Dialog

    lateinit var context: Activity
    fun initialize(activity: Activity) {
        this.context = activity

        dialog = Dialog(context, R.style.baseDialog)
        setView(View(context))
        val inflater = context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

        try {
            dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        } catch (e: Exception) {
        }

        layout = inflater.inflate(R.layout.c_component_base_dialog, null)
    }


    lateinit var layout: View
    lateinit var innerLayout: View
    var CanceledOnTouchOutside = false

    @CallSuper
    override fun setView(view: View) {
        innerLayout = view
    }

    @CallSuper
    override fun onloadComplete() {
    }


    @CallSuper
    override fun setDialogOptions(dialog: Dialog) {
    }

    fun setTitle(title:String){
        layout.title.text = title
    }


    fun show() {
        innerLayout.getViewTreeObserver().addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                innerLayout.getViewTreeObserver().removeOnGlobalLayoutListener(this)

                if (innerLayout.height>context.resources.getDimension(R.dimen._450sdp).toInt()||innerLayout.height==0)
                    innerLayout.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, context.resources.getDimension(R.dimen._350sdp).toInt())
                else
                    innerLayout.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)

            }
        })

        layout._c_Container_Layout.addView(innerLayout)
        dialog.setContentView(layout)
        dialog.setCanceledOnTouchOutside(CanceledOnTouchOutside)
        layoutJingul()
        dialog.window?.setBackgroundDrawable(
                ColorDrawable(Color.TRANSPARENT))
        setDialogOptions(dialog)
        dialog.show()
        layout._close_area.setOnClickListener {
            dialog.dismiss()
        }
        layout.cv_dialog.setOnClickListener {  }
        onloadComplete()
    }

    private fun layoutJingul() {

        val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        val mSensor: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

        sensorManager.registerListener(object :SensorEventListener{
            override fun onSensorChanged(p0: SensorEvent?) {
                layout.cl_dialog.rotation = p0!!.values[0]
            }

            override fun onAccuracyChanged(p0: Sensor?, p1: Int) {

            }

        }, mSensor, SensorManager.SENSOR_DELAY_NORMAL)

    }


}