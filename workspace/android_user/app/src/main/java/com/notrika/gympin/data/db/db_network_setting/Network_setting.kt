package com.notrika.gympin.data.db.db_network_setting

import android.util.Log
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.network.NetworkConstants
import java.util.*
import javax.inject.Inject

class Network_setting
//essential helpers

@Inject
constructor(internal var db: DBStructure) {
    //keys
    private val baseUrlKey = "BaseUrl_Key"
    private val baseMediaUrlKey = "baseMediaUrlKey"
    private val baseWebViewUrlKey = "baseWebViewUrlKey"
    private val authTokenKey = "authToken_Key"
    private val EncryptionTempKeyKey = "EncryptionTempKeyKey"
    private val RefreshTokenKey = "RefreshTokenKey"
    private val EncryptionKeyKey = "EncryptionKeyKey"
    private val TokenLifeTimeKey = "TokenLifeTimeKey"
    private val UserTokenKey = "UserTokenKey"
    private val cacheCinemaTBLClientKey = "ClientCinemaTBL"
    private val cacheBannerTBLClientKey = "ClientBannerTBL"
    private val cacheOnScreenTblClientKey = "ClientOnScreenTbl"
    private val cacheCategoriesTblClientKey = "ClientCategoriesTbl"
    private val notificationTokenSendKey = "notificationTokenSendKey"
    private val apkdownloadidKey = "apkdownloadidKey"
    private val newVersionUrlKey = "newVersionUrlKey"
    private val planEnCodeKey = "planEnCodeKey"
    private val DownloadFloatKey = "DownloadFloatKey"


    var RULE_TERMS_WEB_ADDRESS = "/?p=mrule-terms"
    var ABOUT_US_WEB_ENDPOINT = "/?p=mabout"
    var ROLES_WEB_ENDPOINT = "?p=mrule-terms"
    var ROLES_WEB_ENDPOINT2 = "?p=mConditions"
    var FAQ_WEB_ENDPOINT = "/?p=mfaq"
    var ONLINE_CHAT_ENDPOINT = "https://widget.raychat.io/597878d28cc2ab0d27480261"
    var CONTACT_US__WEB_ENDPOINT = "/?p=mcontact"
    var BOX_OFFICE_WEB_ENDPOINT = "/?p=boxoffice"
    var NEWS_MIDDLE_ADDRESS = "/?p=mnewsd&nid="
    var DOWNLOAD_APP = "/?p=app&invtefriendandroid"



    //baseurl
    var baseUrl: String?
        get() {
//            return "http://192.168.40.10:1997"
//            return "http://5.202.192.42:27682"

            try {
                val url = settings[baseUrlKey]
                return url ?: NetworkConstants.BASE_API_URL
            } catch (e: Exception) {
                return NetworkConstants.BASE_API_URL
            }
        }
        set(baseUrl) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = baseUrlKey
                NTBLsettings.settings_value = baseUrl

                insert(NTBLsettings)
            }.start()

            settings.remove(baseUrlKey)
            settings[baseUrlKey] = baseUrl
        }

    //download float button visibility by user settings
    var DownloadFloatShow: Boolean
        get() {

            try {
                val value = settings[DownloadFloatKey]?.toBoolean()
                return value ?: true
            } catch (e: Exception) {
                return true
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = DownloadFloatKey
                NTBLsettings.settings_value = input.toString()
                insert(NTBLsettings)
            }.start()

            settings.remove(DownloadFloatKey)
            settings[DownloadFloatKey] = input.toString()
        }

    //mediaUrl
    var baseMediaUrl: String?
        get() {
            try {
                val url = settings[baseMediaUrlKey]
                return url ?: NetworkConstants.BASE_MEDIA_URL
            } catch (e: Exception) {
                return NetworkConstants.BASE_MEDIA_URL
            }

        }
        set(baseMediaUrl) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = baseMediaUrlKey
                NTBLsettings.settings_value = baseMediaUrl

                insert(NTBLsettings)
            }.start()

            settings.remove(baseMediaUrlKey)
            settings[baseMediaUrlKey] = baseMediaUrl
        }
    //webViewUrl
    var baseWebViewUrl: String
        get() {
            try {
                val url = settings[baseWebViewUrlKey]
                return url ?: NetworkConstants.BASE_webView_URL
            } catch (e: Exception) {
                return NetworkConstants.BASE_webView_URL
            }

        }
        set(baseWebViewUrl) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = baseWebViewUrlKey
                NTBLsettings.settings_value = baseWebViewUrl

                insert(NTBLsettings)
            }.start()

            settings.remove(baseMediaUrlKey)
            settings[baseMediaUrlKey] = baseWebViewUrl
        }
    //AuthToken
    var authToken: String
        get() {
            try {
                val authToken = settings[authTokenKey]
                return authToken ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(authToken) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = authTokenKey
                NTBLsettings.settings_value = authToken

                insert(NTBLsettings)
            }.start()

            settings.remove(authTokenKey)
            settings[authTokenKey] = authToken
        }

    //encryptionTempKey
    //for activation api
    var encryptionTempKey: String
        get() {

            try {
                val authToken = settings[EncryptionTempKeyKey]
                return authToken ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(encryptionTempKey) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = EncryptionTempKeyKey
                NTBLsettings.settings_value = encryptionTempKey
                insert(NTBLsettings)
            }.start()

            settings.remove(EncryptionTempKeyKey)
            settings[EncryptionTempKeyKey] = encryptionTempKey

        }

    //refresh Token
    var refreshToken: String
        get() {

            try {
                val value = settings[RefreshTokenKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = RefreshTokenKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()
            settings.remove(RefreshTokenKey)
            settings[RefreshTokenKey] = input
        }

    //newVersionUrl
    var newVersionUrl: String
        get() {

            try {
                val value = settings[newVersionUrlKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = newVersionUrlKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()
            settings.remove(newVersionUrlKey)
            settings[newVersionUrlKey] = input
        }


    //update Download id
    var apkdownloadid: Int
        get() {

            try {
                val value = settings[apkdownloadidKey]
                return value?.toInt() ?: 0
            } catch (e: Exception) {
                return 0
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = apkdownloadidKey
                NTBLsettings.settings_value = input.toString()
                insert(NTBLsettings)
            }.start()
            settings.remove(apkdownloadidKey)
            settings[apkdownloadidKey] = input.toString()
        }

    //Encryption Key
    var encryptionKey: String
        get() {

            try {
                val value = settings[EncryptionKeyKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = EncryptionKeyKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()

            settings.remove(EncryptionKeyKey)
            settings[EncryptionKeyKey] = input
        }

    //user token Key
    var userToken: String
        get() {

            try {
                val value = settings[UserTokenKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = UserTokenKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()

            settings.remove(UserTokenKey)
            settings[UserTokenKey] = input
        }

    //pelan encryption Key
    var planEnCode: String
        get() {

            try {
                val value = settings[planEnCodeKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = planEnCodeKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()

            settings.remove(planEnCodeKey)
            settings[planEnCodeKey] = input
        }

    //refresh Token
    var tokenLifiTime: String
        get() {

            try {
                val value = settings[TokenLifeTimeKey]
                return value ?: ""
            } catch (e: Exception) {
                return ""
            }

        }
        set(input) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = TokenLifeTimeKey
                NTBLsettings.settings_value = input
                insert(NTBLsettings)
            }.start()
            settings.remove(TokenLifeTimeKey)
            settings[TokenLifeTimeKey] = input
        }


    //versions
    //    public void setTblVersions(List<Res_CacheItem> cacheList) {
    //        for(Res_CacheItem item : cacheList){
    //
    //                TBL_network_settings NTBLsettings = new TBL_network_settings();
    //                NTBLsettings.setSettings_key(item.getTableName());
    //                NTBLsettings.setSettings_value(item.getTableVersion().toString());
    //                insert(NTBLsettings);
    //
    //            if(getEncryptionTempKey()!=null)
    //                settings.remove(item.getTableName());
    //            settings.put(item.getTableName(), item.getTableVersion().toString());
    //        }
    //    }


    private val TAG = "pocket Data : "
    internal var settings = HashMap<String, String?>()


    //cinema cash
    val cacheCinemaTBLServerKey = "CinemaTBL"
    var vCinemaTBLServer: Long
        get() {
            try {
                val value = settings[cacheCinemaTBLServerKey]
                return if (value != null)
                    java.lang.Long.valueOf(value)
                else
                    0L
            } catch (e: Exception) {
                return 0L
            }

        }
        set(value) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCinemaTBLServerKey
                NTBLsettings.settings_value = value.toString()

                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCinemaTBLServerKey)
            settings[cacheCinemaTBLServerKey] = value.toString()
        }
    val isCinemaTBLUpdateNeed: Boolean
        get() {
            try {
                val value = settings[cacheCinemaTBLClientKey]
                return if (value != null)
                    Integer.valueOf(value) < vCinemaTBLServer
                else
                    true
            } catch (e: Exception) {
                return true
            }

        }

    fun setCinemaTBLUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCinemaTBLClientKey
                NTBLsettings.settings_value = vCinemaTBLServer.toString()
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCinemaTBLClientKey)
            settings[cacheCinemaTBLClientKey] = vCinemaTBLServer.toString()
        } catch (e: Exception) {
        }

    }

    fun setCinemaNeedToUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCinemaTBLClientKey
                NTBLsettings.settings_value = 0.toString() + ""
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCinemaTBLClientKey)
            settings[cacheCinemaTBLClientKey] = 0.toString() + ""
        } catch (e: Exception) {
        }

    }

    //banner cash
    private val cacheBannerTBLServerKey = "BannerTBL"
    var vBannerTBLServer: Long
        get() {
            try {
                val value = settings[cacheBannerTBLServerKey]
                return if (value != null)
                    java.lang.Long.valueOf(value)
                else
                    0L
            } catch (e: Exception) {
                return 0L
            }

        }
        set(value) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheBannerTBLServerKey
                NTBLsettings.settings_value = value.toString()

                insert(NTBLsettings)
            }.start()

            settings.remove(cacheBannerTBLServerKey)
            settings[cacheBannerTBLServerKey] = value.toString()
        }

    private val RegisteredOneSignalIdKey = "RegisteredOneSignalIdKey"
    var RegisteredOneSignalId: String
        get() {
            return try {
                settings[RegisteredOneSignalIdKey] ?: ""
            } catch (e: Exception) {
                ""
            }

        }
        set(value) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = RegisteredOneSignalIdKey
                NTBLsettings.settings_value = value.toString()

                insert(NTBLsettings)
            }.start()

            settings.remove(RegisteredOneSignalIdKey)
            settings[RegisteredOneSignalIdKey] = value.toString()
        }
    val isBannersTblUpdateNeed: Boolean
        get() {
            try {
                val value = settings[cacheBannerTBLClientKey]
                return if (value != null)
                    Integer.valueOf(value) < vBannerTBLServer
                else
                    true
            } catch (e: Exception) {
                return true
            }

        }

    fun setBannerTBLUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheBannerTBLClientKey
                NTBLsettings.settings_value = vBannerTBLServer.toString()
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheBannerTBLClientKey)
            settings[cacheBannerTBLClientKey] = vBannerTBLServer.toString()
        } catch (e: Exception) {
        }

    }

    fun setBannerNeedToUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheBannerTBLClientKey
                NTBLsettings.settings_value = 0.toString() + ""
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheBannerTBLClientKey)
            settings[cacheBannerTBLClientKey] = 0.toString() + ""
        } catch (e: Exception) {
        }

    }

    //onscreen cashe
    val cacheOnScreenTblServerKey = "OnScreen"
    var vOnScreenTblServer: Long
        get() {
            try {
                val value = settings[cacheOnScreenTblServerKey]
                return if (value != null)
                    java.lang.Long.valueOf(value)
                else
                    0L
            } catch (e: Exception) {
                return 0L
            }

        }
        set(value) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheOnScreenTblServerKey
                NTBLsettings.settings_value = value.toString()

                insert(NTBLsettings)
            }.start()

            settings.remove(cacheOnScreenTblServerKey)
            settings[cacheOnScreenTblServerKey] = baseMediaUrl
        }
    val isOnScreenTblUpdateNeed: Boolean
        get() {
            try {
                val value = settings[cacheOnScreenTblClientKey]
                return if (value != null)
                    Integer.valueOf(value) < vOnScreenTblServer
                else
                    true
            } catch (e: Exception) {
                return true
            }

        }

    fun setOnScreenTblUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheOnScreenTblClientKey
                NTBLsettings.settings_value = vOnScreenTblServer.toString()
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheOnScreenTblClientKey)
            settings[cacheOnScreenTblClientKey] = vOnScreenTblServer.toString()
        } catch (e: Exception) {
        }

    }

    fun setOnScreenNeedToUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheOnScreenTblClientKey
                NTBLsettings.settings_value = 0.toString() + ""
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheOnScreenTblClientKey)
            settings[cacheOnScreenTblClientKey] = 0.toString() + ""
        } catch (e: Exception) {
        }

    }

    //category cashe
    val cacheCategoriesTblServerKey = "CategoriesTbl"
    var vCategoriesTblServer: Long
        get() {
            try {
                val value = settings[cacheCategoriesTblServerKey]
                return if (value != null)
                    java.lang.Long.valueOf(value)
                else
                    0L
            } catch (e: Exception) {
                return 0L
            }

        }
        set(value) {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCategoriesTblServerKey
                NTBLsettings.settings_value = value.toString()

                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCategoriesTblServerKey)
            settings[cacheCategoriesTblServerKey] = value.toString()
        }
    val isCategoriesTblUpdateNeed: Boolean
        get() {
            try {
                val value = settings[cacheCategoriesTblClientKey]
                return if (value != null)
                    Integer.valueOf(value) < vCategoriesTblServer
                else
                    true
            } catch (e: Exception) {
                return true
            }

        }

    fun setCategoriesTblUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCategoriesTblClientKey
                NTBLsettings.settings_value = vCategoriesTblServer.toString()
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCategoriesTblClientKey)
            settings[cacheCategoriesTblClientKey] = vCategoriesTblServer.toString()
        } catch (e: Exception) {
        }

    }

    fun setCategoriesNeedToUpdated() {
        try {
            Thread {
                val NTBLsettings = TBL_network_settings()
                NTBLsettings.settings_key = cacheCategoriesTblClientKey
                NTBLsettings.settings_value = 0.toString() + ""
                insert(NTBLsettings)
            }.start()

            settings.remove(cacheCategoriesTblClientKey)
            settings[cacheCategoriesTblClientKey] = 0.toString() + ""
        } catch (e: Exception) {
        }

    }



    private fun insert(ntbl_settings: TBL_network_settings) {
        db.setting().insert(ntbl_settings)
        RefreshValue(ntbl_settings)
    }

    private fun update(pocketValue: TBL_network_settings) {
        db.setting().update(pocketValue)
        RefreshValue(pocketValue)

    }

    private fun delete(pocketValue: TBL_network_settings) {
        db.setting().delete(pocketValue.settings_key)
        DeleteValue(pocketValue)

    }


    private fun RefreshValue(ntblSettings: TBL_network_settings) {
        settings[ntblSettings.settings_key] = ntblSettings.settings_value

    }

    private fun DeleteValue(pocketValue: TBL_network_settings) {
        settings.remove(pocketValue.settings_key)
    }

    init {
        Thread {
            val data = db.setting().all
            for (pocket in data) {
                settings[pocket.settings_key] = pocket.settings_value
                Log.d(TAG, "netWork initialize: " + pocket.settings_key + "    --    " + pocket.settings_value)
            }
            Log.d(TAG, "netWork initialize: " + "ok")
        }.start()
    }


}