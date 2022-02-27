package com.notrika.gympin.di.main

import com.notrika.gympin.ui.main.browser.FragmentBrowser
import com.notrika.gympin.ui.main.contents.FragmentContents
import com.notrika.gympin.ui.main.credit.FragmentCredit
import com.notrika.gympin.ui.main.events.createEvent.FragmentCreateEvent
import com.notrika.gympin.ui.main.events.event.FragmentEvent
import com.notrika.gympin.ui.main.sports.eventsList.FragmentEventsList
import com.notrika.gympin.ui.main.gympin.FragmentGympin
import com.notrika.gympin.ui.main.leaderBoard.FragmentLeaderBoard
import com.notrika.gympin.ui.main.messages.FragmentMessages
import com.notrika.gympin.ui.main.messages.chat.FragmentChat
import com.notrika.gympin.ui.main.myEvents.FragmentMyEvents
import com.notrika.gympin.ui.main.notifs.FragmentNotifs
import com.notrika.gympin.ui.main.places.FragmentPlaces
import com.notrika.gympin.ui.main.myProfile.FragmentMyProfile
import com.notrika.gympin.ui.main.myProfile.editProfile.FragmentEditProfile
import com.notrika.gympin.ui.main.settings.FragmentSettings
import com.notrika.gympin.ui.main.singleContent.FragmentSingleContents
import com.notrika.gympin.ui.main.sports.FragmentSports
import com.notrika.gympin.ui.main.userProfile.FragmentUserProfile
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun sport_fragment(): FragmentSports
    @ContributesAndroidInjector
    internal abstract fun places_fragment(): FragmentPlaces
    @ContributesAndroidInjector
    internal abstract fun gympin_fragment(): FragmentGympin
    @ContributesAndroidInjector
    internal abstract fun profile_fragment(): FragmentMyProfile
    @ContributesAndroidInjector
    internal abstract fun settings_fragment(): FragmentSettings
    @ContributesAndroidInjector
    internal abstract fun contents_fragment(): FragmentContents
    @ContributesAndroidInjector
    internal abstract fun credit_fragment(): FragmentCredit
    @ContributesAndroidInjector
    internal abstract fun events_fragment(): FragmentEventsList
    @ContributesAndroidInjector
    internal abstract fun leader_board_fragment(): FragmentLeaderBoard
    @ContributesAndroidInjector
    internal abstract fun messages_fragment(): FragmentMessages
    @ContributesAndroidInjector
    internal abstract fun my_events_fragment(): FragmentMyEvents
    @ContributesAndroidInjector
    internal abstract fun notifs_fragment(): FragmentNotifs
    @ContributesAndroidInjector
    internal abstract fun single_contents_fragment(): FragmentSingleContents
    @ContributesAndroidInjector
    internal abstract fun chat_fragment(): FragmentChat
    @ContributesAndroidInjector
    internal abstract fun user_profile_fragment(): FragmentUserProfile
    @ContributesAndroidInjector
    internal abstract fun edit_profile_fragment(): FragmentEditProfile
    @ContributesAndroidInjector
    internal abstract fun event_fragment(): FragmentEvent
    @ContributesAndroidInjector
    internal abstract fun create_event_fragment(): FragmentCreateEvent
    @ContributesAndroidInjector
    internal abstract fun browser_fragment(): FragmentBrowser
}
