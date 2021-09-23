package com.notrika.gympin_master.ui.register.login

import android.os.CountDownTimer
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.data.model.Req.Req_Login
import com.notrika.gympin_master.data.model.Req.Req_SendSms
import com.notrika.gympin_master.data.model.Res.Res_Login
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.repository.ACCOUNT_REPO
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

    fun requestSendSms(phoneNumber: Req_SendSms): LiveData<Resource<Boolean>> {
        return accountRepo.observeSendSms(phoneNumber)
    }
    fun requestLogin(req_login: Req_Login): LiveData<Resource<Res_Login>> {
        return accountRepo.observeLogin(req_login)
    }
}
