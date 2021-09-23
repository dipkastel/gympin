package com.notrika.gympin.ui.main

import android.os.Bundle
import android.os.CountDownTimer
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.notrika.cbar.CiBar
import com.notrika.gympin.BaseActivity
import com.notrika.gympin.MainDirections
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject


class ActivityMain : BaseActivity() {

    private lateinit var navController: NavController

    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket

    @Inject
    lateinit var networkSetting: Network_setting

    @Inject
    lateinit var ciBar: CiBar




    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)
        if (savedInstanceState == null) {
            config()
        }
        btn_setting.setOnClickListener {
            navController.navigate(MainDirections.toSettings())
        }
        btn_user_profile.setOnClickListener {
            navController.navigate(MainDirections.toProfile())
        }
//
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        config()
    }

    public fun setTitle(title:String){
        topAppBar.title = title
    }

    private fun config() {
        navController = findNavController(R.id.nav_host_fragment_main)
        navController.setGraph(R.navigation.main)
        bottom_nav.setupWithNavController(navController)
        supportActionBar?.hide()
        bottom_nav.itemIconTintList = null
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp()
    }

    private var exitTimer: Long = 0
    override fun onBackPressed() {
        if (navController.currentDestination?.id != R.id.main_gympin) {
            super.onBackPressed()
            return
        }
        if (exitTimer != 0.toLong()) {
            finishAffinity()
        } else {
            ciBar.createAlert(this, resources.getString(R.string.pleaseclickAgainForExit), CiBar.FAST_CBAR_DURATION).show()
            val timer = object : CountDownTimer(3000, 100) {
                override fun onTick(millisUntilFinished: Long) {
                    exitTimer = millisUntilFinished
                }

                override fun onFinish() {
                    exitTimer = 0
                }
            }
            timer.start()
        }
    }
}
