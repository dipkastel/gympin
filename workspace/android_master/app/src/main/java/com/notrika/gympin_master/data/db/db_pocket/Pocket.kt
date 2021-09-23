package com.notrika.gympin_master.data.db.db_pocket

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.model.Res.Res_UserPlace
import java.util.ArrayList
import javax.inject.Inject

class Pocket @Inject constructor(protected var database: DBStructure) : PocketBase(database) {

    var phoneNumber: String
        get() = getString("phoneNumber")
        set(value) = insert("phoneNumber", value)

    var userId: Long
        get() = getLong("UserId")
        set(value) = insert("UserId", value)

    var userRole: String
        get() = getString("UserRole")
        set(value) = insert("UserRole", value)

    var userToken: String
        get() = getString("UserToken")
        set(value) = insert("UserToken", value)

    var userName: String
        get() = getString("UserName")
        set(value) = insert("UserName", value)

    var userPlaces: List<Res_UserPlace>
        get(){
            var placesString = getString("UserPlaces")

            val type = object : TypeToken<List<Res_UserPlace>>() {}
            var places:List<Res_UserPlace> = ArrayList();
            try {
                places = Gson().fromJson(placesString,type.type)
            }catch (e:Exception){}
            return places
        }
        set(value){
            insert("UserPlaces", Gson().toJson(value))
        }
    var userCurrentPlace: Res_UserPlace?
        get(){
            var places:Res_UserPlace? = null;
            try {
                places = Gson().fromJson(getString("UserCurrentPlace"),Res_UserPlace::class.java)
            }catch (e:Exception){}
            return places
        }
        set(value){
            insert("UserCurrentPlace", Gson().toJson(value))
        }


}
