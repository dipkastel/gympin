package com.notrika.gympin.data.db.db_pocket

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.notrika.gympin.data.db.DBStructure
import java.util.*
import java.util.concurrent.Executors
import javax.inject.Inject
import kotlin.collections.ArrayList

class Pocket @Inject constructor(var db: DBStructure) {

    //livedatas
    var LiveUserBalance: MutableLiveData<Int> = MutableLiveData()
    var LiveUserPoints: MutableLiveData<Int> = MutableLiveData()

    //keys
    private val phoneNumberKey = "phoneNumberKey"
    private val TempPhoneNumberKey = "TempPhoneNumberKey"
    private val LastSmsSentTimeKey = "LastSmsSentTimeKey"
    private val deviceIdKey = "deviceIdKey"
    private val LastVersionKey = "LastVersionKey"
    private val LastLocationKey = "LastLocationKey"
    private val CinemaSortKey = "CinemaSortKey"
    private val selectedCityKey = "selectedCityKey"
    private val UserCreditKey = "UserCreditKey"
    private val UserTotalPointKey = "UserTotalPointKey"
    private val DeviceHeightKey = "DeviceHeightKey"
    private val DeviceWidthKey = "DeviceWidthKey"
    private val currentFontKey = "currentFontKey"
    private val LastUpdateStateKey = "LastUpdateStateKey"
    private val LastUpdateUrlKey = "LastUpdateUrlKey"
    private val TempUserSearchKey = "TempUserSearchKey"
    private val NotSuccededReserveCodeKey = "NotSuccededReserveCodeKey"

    private val userUserNameKey = "userUserNameKey"
    private val userEmailKey = "userEmailKey"
    private val userImageUrlKey = "userImageUrlKey"
    private val userTotalPointKey = "userTotalPointKey"
    private val userAddressKey = "userAddressKey"
    private val userBirthDateKey = "userBirthDateKey"
    private val userMobileKey = "userMobileKey"
    private val userSexKey = "userSexKey"
    private val userNameKey = "userNameKey"
    private val userBalanceKey = "userBalanceKey"
    private val userIsSpecialKey = "userIsSpecialKey"
    private val userUserIdKey = "userUserIdKey"
    private val userCinemaCodeFavoriteKey = "userCinemaCodeFavoriteKey"


    //------------------------------

    var phoneNumber: String?
        get() = if (pockets[phoneNumberKey] != null) pockets[phoneNumberKey] else ""
        set(phoneNumber) = insert(TBL_POCKET(phoneNumberKey, phoneNumber))

    var TempPhoneNumber: String?
        get() = if (pockets[TempPhoneNumberKey] != null) pockets[TempPhoneNumberKey] else ""
        set(TempPhoneNumber) = insert(TBL_POCKET(TempPhoneNumberKey, TempPhoneNumber))

    val isUserRegister: Boolean
        get() = phoneNumber != ""

    var CinemaSort: Int
        get() = if (pockets[CinemaSortKey] != null) pockets[CinemaSortKey]!!.toInt() else 0
        set(cinemaSort) = insert(TBL_POCKET(CinemaSortKey, cinemaSort.toString()))

//    var CinemaSelectedCity: M_City
//        get() {
//            var city = M_City()
//            pockets[selectedCityKey]?.let {
//                city = Gson().fromJson(pockets[selectedCityKey], M_City::class.java)
//            }
//            return city
//        }
//        set(CinemaListCity) {
//            insert(TBL_POCKET(selectedCityKey, Gson().toJson(CinemaListCity)))
//        }
//
//    var LastLocation: Location
//        get() {
//            if (pockets[LastLocationKey] == null) {
//                val location = Location("")
//                location.latitude = GeneralConstants.TEHRAN_LATITUDE
//                location.longitude = GeneralConstants.TEHRAN_LONGITUDE
//                return location
//            } else {
//
//
//                val location = Location("")
//                location.latitude = pockets[LastLocationKey]!!.split(',')[0].toDouble()
//                location.longitude = pockets[LastLocationKey]!!.split(',')[1].toDouble()
//                return location
//            }
//        }
//        set(CinemaListCity: Location) {
//            insert(TBL_POCKET(LastLocationKey, CinemaListCity.latitude.toString() + "," + CinemaListCity.longitude.toString()))
//        }

    var SearchSplitItem = "«"
    var SearchItemCount = 10
    var getLastSearch = ArrayList<String>()
        get() {
           var searches =  if (pockets[TempUserSearchKey] != null) pockets[TempUserSearchKey] else ""
            return ArrayList(searches?.split(SearchSplitItem)?.take(SearchItemCount)?:ArrayList<String>())
        }

    var setLastSearch = String()
        set(_field){

            var searches =  if (pockets[TempUserSearchKey] != null) pockets[TempUserSearchKey] else ""
            var searchesList = ArrayList(searches?.split(SearchSplitItem)?:ArrayList<String>())
            if(searchesList.contains(_field)&&_field.isNotEmpty()){
                searches = searches?.replace(_field+SearchSplitItem,"")
            }
             insert(TBL_POCKET(TempUserSearchKey, "$_field$SearchSplitItem$searches"))
            field = _field
        }

    var NotSuccededReserveCode: String?
        get() = pockets[NotSuccededReserveCodeKey]
        set(ReserveCode) = insert(TBL_POCKET(NotSuccededReserveCodeKey, ReserveCode))

    //------------------------------

    var smsTime: Long = 90000

    var LastSmsSentTime: Long
        get() = if (pockets[LastSmsSentTimeKey] != null) pockets[LastSmsSentTimeKey]!!.toLong() else 0.toLong()
        set(currentTime) = insert(TBL_POCKET(LastSmsSentTimeKey, currentTime.toString()))

    val canSendSms: Boolean
        get() = LastSmsSentTime + smsTime < System.currentTimeMillis()


    var UpdateAvailableStatus: Int
        get() = if (pockets[LastUpdateStateKey] != null) pockets[LastUpdateStateKey]!!.toInt() else 0
        set(isAvalable) = insert(TBL_POCKET(LastUpdateStateKey, isAvalable.toString()))

    var UpdateUrl: String
        get() = if (pockets[LastUpdateUrlKey] != null) pockets[LastUpdateUrlKey]!! else ""
        set(url) = insert(TBL_POCKET(LastUpdateUrlKey, url))


    var remainTime: Long = 0
        get() = smsTime - (System.currentTimeMillis() - LastSmsSentTime)
        set(value) {
            field = value
        }


    //------------------------------
    val deviceId: String
        get() {
            if (pockets[deviceIdKey] == null) {
                val uuid = UUID.randomUUID().toString()
                insert(TBL_POCKET(deviceIdKey, uuid))
                return uuid
            }
            return if (pockets[deviceIdKey] == null) "" else pockets[deviceIdKey]!!
        }

    //------------------------------
    //check version and return true when last and new version is different and set new version as last version
//    val isFirstOpenAfterUpdate: Boolean
//        get() {
//            var lastVersion = 0
//            try {
//                lastVersion = Integer.valueOf(pockets[LastVersionKey]!!)
//            } catch (e: Exception) {
//            }
//
//            insert(TBL_POCKET(LastVersionKey, BuildConfig.VERSION_CODE.toString()))
//            return when {
//                lastVersion == 0 -> true
//                lastVersion < BuildConfig.VERSION_CODE -> true
//                else -> false
//            }
//        }
    //-----------User-------------------
    var userUserName: String
        get() = pockets[userUserNameKey] ?: ""
        set(userName) = insert(TBL_POCKET(userUserNameKey, userName))
    var userEmail: String
        get() = pockets[userEmailKey] ?: ""
        set(email) = insert(TBL_POCKET(userEmailKey, email))
    var userUserId: Int
        get() = pockets[userUserIdKey]?.toInt() ?: 0
        set(email) = insert(TBL_POCKET(userUserIdKey, email.toString()))
    var userCinemaCodeFavorite: String
        get() = pockets[userCinemaCodeFavoriteKey] ?: ""
        set(email) = insert(TBL_POCKET(userCinemaCodeFavoriteKey, email))
    var userMobile: String
        get() = pockets[userMobileKey] ?: ""
        set(email) = insert(TBL_POCKET(userMobileKey, email))
    var userSex: String
        get() = pockets[userSexKey] ?: ""
        set(email) = insert(TBL_POCKET(userSexKey, email))
    var userIsSpecial: Boolean
        get() = pockets[userIsSpecialKey]?.toBoolean() ?: false
        set(email) = insert(TBL_POCKET(userIsSpecialKey, email.toString()))
    var userAddress: String
        get() = pockets[userAddressKey] ?: ""
        set(email) = insert(TBL_POCKET(userAddressKey, email))
    var userBirthDate: String
        get() = pockets[userBirthDateKey] ?: ""
        set(email) = insert(TBL_POCKET(userBirthDateKey, email))
    var userName: String
        get() = pockets[userNameKey] ?: ""
        set(input) = insert(TBL_POCKET(userNameKey, input))
    var userImageUrl: String
        get() = pockets[userImageUrlKey] ?: ""
        set(input) = insert(TBL_POCKET(userImageUrlKey, input))
    var userBalance: Int
        get() {
            var result = 0
            pockets[userBalanceKey]?.apply {
                LiveUserBalance.value = pockets[userBalanceKey]?.toInt() ?: 0
                result = pockets[userBalanceKey]?.toInt() ?: 0
            }
            return result
        }
        set(value) {
            insert(TBL_POCKET(userBalanceKey, value.toString()))
            if (!pockets[userBalanceKey].isNullOrEmpty()) {
                LiveUserBalance.value = value
            }
        }
    var userTotalPoint: Int
        get() {
            var result = 0
            pockets[userTotalPointKey]?.apply {
                LiveUserPoints.value = pockets[userTotalPointKey]?.toInt() ?: 0
                result = pockets[UserTotalPointKey]!!.toInt()
            }
            return result
        }
        set(value) {
            insert(TBL_POCKET(UserTotalPointKey, value.toString()))
            if (!pockets[UserTotalPointKey].isNullOrEmpty()) {
                LiveUserPoints.value = value
            }
        }
///////////////////////////////////

    var deviceWidth: Int?
        get() {
            if (pockets[DeviceWidthKey] != null) {
                try {
                    return Integer.valueOf(pockets[DeviceWidthKey]!!)
                } catch (e: Exception) {
                    return 0
                }

            }
            return 0
        }
        set(integer) = insert(TBL_POCKET(DeviceWidthKey, integer.toString()))
    var deviceHeight: Int?
        get() {
            if (pockets[DeviceHeightKey] != null) {
                try {
                    return Integer.valueOf(pockets[DeviceHeightKey]!!)
                } catch (e: Exception) {
                    return 0
                }

            }
            return 0
        }
        set(integer) = insert(TBL_POCKET(DeviceHeightKey, integer.toString()))

    internal var pocketDao = db.pocketDao()
    private val TAG = "pocket Data : "
    private val pockets = HashMap<String, String?>()
    private val threadPool = Executors.newFixedThreadPool(1)

//essential helpers


    fun setUserCredit(input: Int) {

        insert(TBL_POCKET(UserCreditKey, input.toString()))
    }

    private fun insert(pocketValue: TBL_POCKET) {
        threadPool.submit { pocketDao.insert(pocketValue) }
        RefreshValue(pocketValue)
    }


    private fun update(pocketValue: TBL_POCKET) {
        threadPool.submit { pocketDao.update(pocketValue) }
        RefreshValue(pocketValue)

    }

    private fun delete(pocketValue: TBL_POCKET) {
        threadPool.submit { pocketDao.delete(pocketValue) }
        DeleteValue(pocketValue)

    }


    private fun delete(pocketValue: List<TBL_POCKET>) {
        threadPool.submit { pocketDao.delete(pocketValue) }
        DeleteValue(pocketValue)

    }

//    fun deleteAll() {
//
//        pocketDao.all.observeForever {
//            for (item in it) {
//                delete(item)
//            }
//        }
//
//    }


    private fun RefreshValue(pocketValue: TBL_POCKET) {
        if (pockets[pocketValue.pockeT_Key] != null)
            pockets.remove(pocketValue.pockeT_Key)
        pockets[pocketValue.pockeT_Key] = pocketValue.pockeT_Value
    }

    private fun DeleteValue(pocketValue: TBL_POCKET) {
        try {
            pockets.remove(pocketValue.pockeT_Key)

        } catch (e: Exception) {
        }
    }

    private fun DeleteValue(pocketValue: List<TBL_POCKET>) {
        for (pocket: TBL_POCKET in pocketValue)
            pockets[pocket.pockeT_Key] = pocket.pockeT_Value
    }

    var currentFont: String?
        get() = if (pockets[currentFontKey] != null) pockets[currentFontKey] else "fonts/IRANSans.ttf"
        set(input) = insert(TBL_POCKET(currentFontKey, input))

//    fun initializa() {
//            pocketDao.all.observeForever {
//                for (pocket in pocketDao) {
//                    pockets[pocket.pockeT_Key] = pocket.pockeT_Value
//                    Log.d(TAG, "initializa: " + pocket.pockeT_Key + "  -  " + pocket.pockeT_Value)
//                }
//                fillLivedatas()
//                Log.d(TAG, "initializa: " + "ok")
//            }
//    }

    private fun fillLivedatas() {
        if (!pockets[UserCreditKey].isNullOrEmpty()) {
            LiveUserBalance.value = pockets[UserCreditKey]?.toInt() ?: 0
        }

        if (!pockets[UserTotalPointKey].isNullOrEmpty()) {
            LiveUserPoints.value = pockets[UserTotalPointKey]?.toInt() ?: 0
        }

    }
//
//    init {
//        initializa()
//    }

}
