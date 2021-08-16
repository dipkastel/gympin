package com.notrika.gympin_master.ui.register

import android.os.Bundle
import com.notrika.gympin_master.R
import com.notrika.gympin_master.util.viewmodel.ViewModelProviderFactory
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
