package com.notrika.gympin.di.main

import com.notrika.gympin.ui.main.MyContents.FragmentMyContents
import com.notrika.gympin.ui.main.contents.FragmentContents
import com.notrika.gympin.ui.main.credit.FragmentCredit
import com.notrika.gympin.ui.main.events.FragmentEvents
import com.notrika.gympin.ui.main.gympin.FragmentGympin
import com.notrika.gympin.ui.main.leaderBoard.FragmentLeaderBoard
import com.notrika.gympin.ui.main.messages.FragmentMessages
import com.notrika.gympin.ui.main.myEvents.FragmentMyEvents
import com.notrika.gympin.ui.main.notifs.FragmentNotifs
import com.notrika.gympin.ui.main.places.FragmentPlaces
import com.notrika.gympin.ui.main.profile.FragmentProfile
import com.notrika.gympin.ui.main.settings.FragmentSettings
import com.notrika.gympin.ui.main.singleContent.FragmentSingleContents
import com.notrika.gympin.ui.main.sports.FragmentSports
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
    internal abstract fun profile_fragment(): FragmentProfile
    @ContributesAndroidInjector
    internal abstract fun settings_fragment(): FragmentSettings
    @ContributesAndroidInjector
    internal abstract fun contents_fragment(): FragmentContents
    @ContributesAndroidInjector
    internal abstract fun credit_fragment(): FragmentCredit
    @ContributesAndroidInjector
    internal abstract fun events_fragment(): FragmentEvents
    @ContributesAndroidInjector
    internal abstract fun leader_board_fragment(): FragmentLeaderBoard
    @ContributesAndroidInjector
    internal abstract fun messages_fragment(): FragmentMessages
    @ContributesAndroidInjector
    internal abstract fun my_contents_fragment(): FragmentMyContents
    @ContributesAndroidInjector
    internal abstract fun my_events_fragment(): FragmentMyEvents
    @ContributesAndroidInjector
    internal abstract fun notifs_fragment(): FragmentNotifs
    @ContributesAndroidInjector
    internal abstract fun single_contents_fragment(): FragmentSingleContents
}
