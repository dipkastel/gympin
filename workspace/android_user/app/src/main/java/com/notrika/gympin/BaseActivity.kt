package com.notrika.gympin

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.ui.register.ActivityRegister
import dagger.android.support.DaggerAppCompatActivity
import javax.inject.Inject

abstract class BaseActivity : DaggerAppCompatActivity() {


    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun reautorizationUser(activity: Activity, onAuthorizeComplete: onAuthorizeComplete) {
        //refreshToken
        if (false) {
            onAuthorizeComplete.authorized()
            return
        } else {
            activity.finish()
            logout()
            val myIntent = Intent(this, ActivityRegister::class.java)
            this.startActivity(myIntent)
            return
        }


    }

    private fun logout() {
        pocket.userToken = ""
        pocket.userId = 0
        pocket.userName = ""
        pocket.userRole = ""

    }


}
