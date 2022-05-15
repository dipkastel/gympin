package com.notrika.gympin.ui.common

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import com.notrika.gympin.ui.register.ActivityRegister
import com.onesignal.OSNotificationAction.ActionType
import com.onesignal.OSNotificationOpenedResult
import com.onesignal.OneSignal

class NotificationOpenedHandler(  // This fires when a notification is opened by tapping on it.
    var context: Context
) : OneSignal.OSNotificationOpenedHandler {
    override fun notificationOpened(result: OSNotificationOpenedResult) {
        val actionType = result.action.type
        val data = result.notification.rawPayload
        val linkType: Int
        val linkParams: String?
        try {


            //check to open web url
            if (result.notification.launchURL != null && result.notification.launchURL.contains(
                    "www"
                )
            ) {
                var url = result.notification.launchURL
                if (!url.contains("://")) url = "http://$url"
                val urlIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url.trim { it <= ' ' }))
                urlIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(urlIntent)
                return
            }


            //check to  open in app link type
//            if (data != null) {
//                linkType = data.(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_TYPE_KEY)
//                linkParams = data.optString(
//                    NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_PARAMS_KEY,
//                    null
//                )
//                val intent = Intent(context, ActivityRegister::class.java)
//                if (linkParams != null) {
//                    intent.putExtra(
//                        NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_TYPE_KEY,
//                        linkType
//                    )
//                    intent.putExtra(
//                        NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_PARAMS_KEY,
//                        linkParams
//                    )
//                }
//                intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_TASK)
//                context.startActivity(intent)
//                return
//            }

            //default
            val intent = Intent(context, ActivityRegister::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        if (actionType == ActionType.ActionTaken) Log.i(
            "OneSignalExample",
            "Button pressed with id: " + result.action.actionId
        )
    }
}