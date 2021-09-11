package com.notrika.gympin_master.data.db.db_pocket

import com.notrika.gympin_master.data.db.DBStructure
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


}
