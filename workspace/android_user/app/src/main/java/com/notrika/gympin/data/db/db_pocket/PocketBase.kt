package com.notrika.gympin.data.db.db_pocket

import com.notrika.gympin.data.db.DBStructure
import java.util.HashMap
import java.util.concurrent.Executors

open class PocketBase(protected var db: DBStructure) {

    protected var pocketDao = db.pocketDao()
    protected val pockets = HashMap<String, String?>()
    private val threadPool = Executors.newFixedThreadPool(1)


    protected fun getString(key:String):String {
         pockets[key]?.let {
            return it
        }
        return ""
    }
    protected fun getBoolean(key:String):Boolean {
         pockets[key]?.let {
            return it.toBoolean()
        }
        return false
    }
    protected fun getInt(key:String):Int {
         pockets[key]?.let {
            return it.toInt()
        }
        return 0
    }
    protected fun getFloat(key:String):Float {
         pockets[key]?.let {
            return it.toFloat()
        }
        return 0f
    }
    protected fun getLong(key:String):Long {
         pockets[key]?.let {
            return it.toLong()
        }
        return 0
    }
    protected fun getDouble(key:String):Double {
         pockets[key]?.let {
            return it.toDouble()
        }
        return 0.00000
    }
    protected fun insert(key:String,value:String?) {
        var pocketdata = TBL_POCKET(key, value)
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun insert(key:String,value:Boolean?) {
        var pocketdata = TBL_POCKET(key, value.toString())
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun insert(key:String,value:Int?) {
        var pocketdata = TBL_POCKET(key, value.toString())
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun insert(key:String,value:Long?) {
        var pocketdata = TBL_POCKET(key, value.toString())
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun insert(key:String,value:Float?) {
        var pocketdata = TBL_POCKET(key, value.toString())
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun insert(key:String,value:Double?) {
        var pocketdata = TBL_POCKET(key, value.toString())
        threadPool.submit { pocketDao.insert(pocketdata) }
        RefreshValue(pocketdata)
    }
    protected fun update(key:String,value:String) {
        var pocketdata = TBL_POCKET(key, value)
        threadPool.submit { pocketDao.update(pocketdata) }
        RefreshValue(pocketdata)

    }

    protected fun delete(key:String,value:String) {
        var pocketdata = TBL_POCKET(key, value)
        threadPool.submit { pocketDao.delete(pocketdata) }
        DeleteValue(pocketdata)
    }


    protected fun RefreshValue(pocketValue: TBL_POCKET) {
        if (pockets[pocketValue.pockeT_Key] != null)
            pockets.remove(pocketValue.pockeT_Key)
        pockets[pocketValue.pockeT_Key] = pocketValue.pockeT_Value
    }

    protected fun DeleteValue(pocketValue: TBL_POCKET) {
        try {
            pockets.remove(pocketValue.pockeT_Key)
        } catch (e: Exception) {
        }
    }

    init {
        pocketDao.all.observeForever {it->
            for (pocket in it) {
                pockets[pocket.pockeT_Key] = pocket.pockeT_Value
            }
        }
    }
}