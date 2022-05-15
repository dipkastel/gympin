package com.notrika.gympin.di.general

import com.notrika.gympin.ui.common.fullScreenMap.FragmentFullScreenMap
import com.notrika.gympin.ui.main.browser.FragmentBrowser
import com.notrika.gympin.ui.main.contents.FragmentContents
import com.notrika.gympin.ui.main.credit.FragmentCredit
import com.notrika.gympin.ui.main.events.walking.eventCreateWalking.FragmentEventCreateWalking
import com.notrika.gympin.ui.main.events.walking.eventWalking.FragmentEventWalking
import com.notrika.gympin.ui.main.gympin.FragmentGympin
import com.notrika.gympin.ui.main.leaderBoard.FragmentLeaderBoard
import com.notrika.gympin.ui.main.messages.FragmentMessages
import com.notrika.gympin.ui.main.messages.chat.FragmentChat
import com.notrika.gympin.ui.main.myEvents.FragmentMyEvents
import com.notrika.gympin.ui.main.myProfile.FragmentMyProfile
import com.notrika.gympin.ui.main.myProfile.editProfile.FragmentEditProfile
import com.notrika.gympin.ui.main.notifs.FragmentNotifs
import com.notrika.gympin.ui.main.places.FragmentPlaces
import com.notrika.gympin.ui.main.settings.FragmentSettings
import com.notrika.gympin.ui.main.singleContent.FragmentSingleContents
import com.notrika.gympin.ui.main.sports.FragmentSports
import com.notrika.gympin.ui.main.events.walking.eventListWalking.FragmentEventListWalking
import com.notrika.gympin.ui.main.survey.FragmentSurveyList
import com.notrika.gympin.ui.main.userProfile.FragmentUserProfile
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class GeneralFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun full_screen_map_fragment(): FragmentFullScreenMap
}
