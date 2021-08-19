package com.notrika.gympin_master.ui.register.login

import android.os.CountDownTimer
import android.text.Editable
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.data.model.Res_Splash
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.repository.ACCOUNT_REPO
import com.notrika.gympin_master.data.repository.SPLASH_REPO
import javax.inject.Inject

class ViewModelLogin @Inject
constructor(private val accountRepo: ACCOUNT_REPO) : ViewModel() {

    var counter: MutableLiveData<Long>? = null


    fun resetCounter(timeToCount:Long){
        if(counter!=null)
            return

        counter = MutableLiveData()
        var timer= object: CountDownTimer(timeToCount,1000) {
            override fun onTick(millisUntilFinished: Long) {
                counter!!.value = millisUntilFinished
            }
            override fun onFinish() {
                counter!!.value = 0

            }
        }
        timer .start()

    }

    fun requestSendSms(phoneNumber: String): LiveData<Resource<Boolean>> {
        return accountRepo.observeSendSms(phoneNumber)
    }
}
