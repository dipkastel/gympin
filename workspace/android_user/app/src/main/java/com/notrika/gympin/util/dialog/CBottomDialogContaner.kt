package com.notrika.gympin.util.dialog

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.view.*
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.LinearLayout
import androidx.annotation.CallSuper
import com.notrika.gympin.R
import kotlinx.android.synthetic.main.c_component_bottom_dialog.view.*


abstract class CBottomDialogContaner : CDialog {


    lateinit var dialog: Dialog

    lateinit var context: Activity
    fun initialize(activity: Activity) {
        this.context = activity

        dialog = Dialog(context, R.style.bottomDialog)
        setView(View(context))
        val inflater = context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

        try {
            dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        } catch (e: Exception) {
        }

        layout = inflater.inflate(R.layout.c_component_bottom_dialog, null)
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

        dialog.window?.setBackgroundDrawable(
                ColorDrawable(Color.TRANSPARENT))
        setDialogOptions(dialog)
        dialog.show()
        onloadComplete()
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun layoutToggle() {

        var _yDelta = 0f
        layout._handle_edge.setOnTouchListener { v, event ->
            val Y = event?.rawY
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> {
                    _yDelta = event.y + layout._keshow_box.top
                }
                MotionEvent.ACTION_UP -> {

                    val valueAnimator = ValueAnimator.ofFloat(0f, 1f)
                    valueAnimator.interpolator =
                        AccelerateDecelerateInterpolator() // increase the speed first and then decrease
                    valueAnimator.duration = 300
                    var delta = layout.translationY
                    valueAnimator.addUpdateListener { animation ->
                        if (delta < (layout._keshow_box.height / 2))
                            layout.translationY = (1f - animation.animatedValue as Float) * delta
                        if (delta > layout._keshow_box.height / 2)
                            layout.translationY =
                                delta + (animation.animatedValue as Float * (layout._keshow_box.height - delta))

                        if (animation.animatedValue == 1f) {
                            if (layout.translationY >= (layout._keshow_box.height - 50)) {
                                dialog.dismiss()
                            }
                        }


                    }

                    valueAnimator.start()

                }
                MotionEvent.ACTION_POINTER_DOWN -> {
                }
                MotionEvent.ACTION_POINTER_UP -> {

                }
                MotionEvent.ACTION_MOVE -> {
                    if (Y != null && Y - _yDelta > 0)
                        layout.translationY = Y - _yDelta
                }
            }
            layout.invalidate()
            true
        }
        layout._close_area.setOnClickListener {
            dialog.dismiss()
        }
    }


}