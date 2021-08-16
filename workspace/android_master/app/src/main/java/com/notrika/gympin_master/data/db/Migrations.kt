package com.notrika.gympin_master.data.db

class Migrations {
//    companion object{
//        @Provides
//        @IntoSet
//        @Singleton
//        open fun provide1To2Migration(): Migration {
//            return object : Migration(1, 2) {
//                override fun migrate(database: SupportSQLiteDatabase) {
//                    try {
//                        val c = database.query("SELECT * FROM TBL_CINEMAS")
//                        c.use {
//                            if (c.moveToFirst()) {
//                                val cv = ContentValues()
//                                cv.put("id", c.getLong(c.getColumnIndex("id")))
//                                cv.put("name", c.getString(c.getColumnIndex("name")))
//                                cv.put("gender", c.getString(c.getColumnIndex("gender")))
//                                cv.put("mobile", c.getString(c.getColumnIndex("mobile")))
//                                cv.put("landline", c.getString(c.getColumnIndex("landline")))
//                                cv.put("email", c.getString(c.getColumnIndex("email")))
//                                cv.put("user_name", c.getString(c.getColumnIndex("user_name")))
//                                cv.put("language", c.getString(c.getColumnIndex("language")))
//                                cv.put("wallet_amount", c.getDouble(c.getColumnIndex("wallet_amount")))
//                                cv.put("profile_image_url", c.getString(c.getColumnIndex("profile_image_url")))
//                                cv.put("current_location", c.getString(c.getColumnIndex("current_location")))
//                                cv.put("source", "Android")
//                                database.execSQL("DROP TABLE IF EXISTS `customer`")
//                                createCustomerTable(database)
//                                database.insert("customer", 0, cv)
//                            } else {
//                                database.execSQL("DROP TABLE IF EXISTS `customer`")
//                                createCustomerTable(database)
//                            }
//                        }
//                    } catch (e: SQLiteException) {
//                    } catch (e: Exception) {
//                    }
//                }
//            }
//        }
//        fun createCustomerTable(database: SupportSQLiteDatabase){
//            database.execSQL("""CREATE TABLE IF NOT EXISTS `customer` (
//                            `id` INTEGER NOT NULL,
//                            `name` TEXT NOT NULL,
//                            `gender` TEXT NOT NULL,
//                            `mobile` TEXT NOT NULL,
//                            `landline` TEXT,
//                            `email` TEXT,
//                            `user_name` TEXT NOT NULL,
//                            `language` TEXT NOT NULL,
//                            `wallet_amount` REAL,
//                            `profile_image_url` TEXT,
//                            `current_location` TEXT,
//                            `source` TEXT,
//                            PRIMARY KEY(`id`))""".trimIndent())
//        }
//    }

}
