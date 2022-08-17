package com.notrika.gympin.ui.main.tickets

import android.app.Activity
import android.content.Context
import android.content.Context.WINDOW_SERVICE
import android.graphics.Bitmap
import android.graphics.Point
import android.view.Display
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import androidx.core.content.ContextCompat
import com.notrika.gympin.R
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import com.notrika.qrcodegenerator.QRGContents
import com.notrika.qrcodegenerator.QRGEncoder
import kotlinx.android.synthetic.main.dialog_qr_code.view.*

class DialogQrCode : CBaseDialogContaner() {

    lateinit var thisView:View
    lateinit var activity:Activity
    lateinit var bitmap: Bitmap
    lateinit var qrEncoder: QRGEncoder

    override fun setView(view: View) {
        val inflater = activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        thisView = inflater.inflate(R.layout.dialog_qr_code, null)
        super.setView(thisView)
    }

    fun init(activity:Activity):DialogQrCode{
        this.activity = activity
        initialize(activity)
        return this
    }

    fun setTitle(title:String):DialogQrCode{
        setDialogTitle(title)
        return this
    }

    fun setQrCode(code: String?): DialogQrCode {

        qrEncoder = QRGEncoder(code, null, QRGContents.Type.TEXT, 1)

        try {
            bitmap = qrEncoder.bitmap
            thisView.idIVQrcode.setImageBitmap(bitmap)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return this
    }


}
