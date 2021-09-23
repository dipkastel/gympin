package com.notrika.gympin_master

import android.content.Intent
import android.os.Bundle
import com.notrika.gympin_master.ui.main.ActivityMain
import dagger.android.support.DaggerAppCompatActivity

abstract class BaseActivity : DaggerAppCompatActivity() {


    private val TAG: String = this.javaClass.name

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun restart() {

        this.finish()
        val myIntent = Intent(this, ActivityMain::class.java)
        this.startActivity(myIntent)
    }
}
