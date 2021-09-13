package com.notrika.gympin.ui.register

import android.os.Bundle
import android.os.CountDownTimer
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerAppCompatActivity
import javax.inject.Inject


class ActivityRegister : DaggerAppCompatActivity() {
    private var exitTimer: Long = 0
    private val TAG: String = this.javaClass.name

    private var viewModel: RegisterViewModel? = null

    @Inject
    lateinit var ProviderFactory: ViewModelProviderFactory
//
//    @Inject
//    lateinit var requestManager: RequestManager
//
//    @Inject
//    lateinit var network_setting: Network_setting

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

    }

//    override fun onBackPressed() {
//        if(exitTimer != 0.toLong())
//        {
//            finishAffinity()
//        }else{
//            val timer = object: CountDownTimer(3000, 100) {
//                override fun onTick(millisUntilFinished: Long) {
//                    exitTimer = millisUntilFinished
//                }
//
//                override fun onFinish() {
//                    exitTimer = 0
//                }
//            }
//            timer.start()
//        }
//    }

}
