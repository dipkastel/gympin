package com.notrika.gympin_master.di

import android.app.Application
import androidx.room.Room
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager
import com.bumptech.glide.request.RequestOptions
import com.notrika.cbar.CiBar
import com.notrika.gympin_master.BuildConfig
import com.notrika.gympin_master.data.db.DBConstants
import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.di.DiConstants.retrofit_gympin_main
import dagger.Module
import dagger.Provides
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Named
import javax.inject.Singleton


@Module
class AppModule {


    @Singleton
    @Provides
    internal fun provideRoomInstance(application: Application): DBStructure {
        return Room.databaseBuilder(application, DBStructure::class.java, DBConstants.DATA_BASE_NAME)
            .fallbackToDestructiveMigration()
//                .addMigrations(Migrations.provide1To2Migration())
            .build()

    }


    @Singleton
    @Provides
    @Named(retrofit_gympin_main)
    internal fun provideRetrofitInstance(network_setting: Network_setting): Retrofit {
        val builder = OkHttpClient.Builder()
        builder.addInterceptor(getReqInterceptor(network_setting))
        builder.readTimeout(40, TimeUnit.SECONDS)
        builder.connectTimeout(40, TimeUnit.SECONDS)
        val httpClient = builder.build()
        return Retrofit.Builder()
                .baseUrl(network_setting.baseUrl!!)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient)
                .build()
    }



    @Singleton
    @Provides
    internal fun pocket(dbStructure: DBStructure): Pocket {
        return Pocket(dbStructure)
    }


    @Singleton
    @Provides
    internal fun networkSetting(dbStructure: DBStructure): Network_setting {
        return Network_setting(dbStructure)
    }


    @Singleton
    @Provides
    internal fun provideRequestOptions(): RequestOptions {
        return RequestOptions()
    }

    @Singleton
    @Provides
    internal fun provideCbar(): CiBar {
        return CiBar()
    }


    @Singleton
    @Provides
    internal fun provideGlideInstance(application: Application, requestOptions: RequestOptions): RequestManager {
        return Glide.with(application).setDefaultRequestOptions(requestOptions)
    }

    private fun getReqInterceptor(network_setting: Network_setting): Interceptor {

        return Interceptor { chain: Interceptor.Chain ->
            val original = chain.request()
            val request = original.newBuilder()
//                    .header("AUTH_TOKEN", network_setting.authToken)
//                    .header("user_token", network_setting.userToken)
//                    .header("Content-Type", "ct-api/ejson")
//                    .header("Accept", "ct-api/ejson")
//                    .header("ApiVersion", "2")
//                    .header("appVersion", BuildConfig.VERSION_NAME + "")
//                    .header("DeviceType", "Android")
                    .method(original.method(), original.body())
                    .build()
            chain.proceed(request)
        }
    }

}
