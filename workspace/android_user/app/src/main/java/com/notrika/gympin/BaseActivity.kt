package com.notrika.gympin

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.jakewharton.threetenabp.AndroidThreeTen
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.repository.ACCOUNT_REPO
import com.notrika.gympin.di.general.utils.MainCustomServiceInterceptor
import com.notrika.gympin.ui.register.ActivityRegister
import dagger.android.support.DaggerAppCompatActivity
import javax.inject.Inject

abstract class BaseActivity : DaggerAppCompatActivity() {


    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket
    @Inject
    lateinit var accountRepo: ACCOUNT_REPO
    @Inject
    lateinit var mainCustomServiceInterceptor: MainCustomServiceInterceptor

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AndroidThreeTen.init(this)

    }

    fun reautorizationUser(onAuthorizeComplete: onAuthorizeComplete) {
        //refreshToken

        accountRepo.observeRefresh().observe(this,{
            when(it.status){
                Resource.Status.SUCCESS -> {
                    it.data?.let {data->
                        pocket.userToken= "Bearer "+data.token
                        pocket.refreshToken= data.refreshToken
                    }

                    Log.d( "--------newtoken",pocket.userToken)
                    //todo check remove this and check new token works or not
//                        myServiceInterceptor.setNewPocket(pocket)
                        onAuthorizeComplete.authorized()
                }
                Resource.Status.ERROR -> {
                    logout()
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE ->{
                    logout()
                }
                Resource.Status.EMPTY ->{
                    logout()
                }
                Resource.Status.UNAUTHORIZED ->{
                    logout()
                }
            }
        })
    }

    fun logout() {
        pocket.userToken = ""
        pocket.userId = 0
        pocket.userName = ""
        pocket.userRole = ""
        this.finish()
        val myIntent = Intent(this, ActivityRegister::class.java)
        this.startActivity(myIntent)
    }


}
