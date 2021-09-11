package com.notrika.gympin.di.register


import com.notrika.gympin.data.network.api.UserApi
import com.notrika.gympin.di.DiConstants
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named

@Module
class RegisterModule @Inject constructor() {



    @Provides
    internal fun provideUserApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }

//    @RegisterScope
//    @Provides
//    internal fun provideAccountApi(@Named(DiConstants.retrofit_cinematicket_main) retrofit: Retrofit): AccountApi {
//        return retrofit.create(AccountApi::class.java)
//    }
//
//    @RegisterScope
//    @Provides
//    internal fun provideRegisterRepository(baseRequests: BaseRequests, accountRequests: AccountRequests, pocket: Pocket): RegisterRepository {
//        return RegisterRepository(baseRequests,accountRequests,pocket)
//    }

}
