package com.notrika.gympin.di.main

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
import com.notrika.gympin.ui.main.places.list.FragmentPlacesList
import com.notrika.gympin.ui.main.settings.FragmentSettings
import com.notrika.gympin.ui.main.singleContent.FragmentSingleContents
import com.notrika.gympin.ui.main.sports.FragmentSports
import com.notrika.gympin.ui.main.events.walking.eventListWalking.FragmentEventListWalking
import com.notrika.gympin.ui.main.place.FragmentPlace
import com.notrika.gympin.ui.main.place.subFragments.about.FragmentPlaceAbout
import com.notrika.gympin.ui.main.place.subFragments.facilities.FragmentPlaceFacilities
import com.notrika.gympin.ui.main.place.subFragments.reserve.FragmentPlaceReserve
import com.notrika.gympin.ui.main.place.subFragments.stall.FragmentStallReserve
import com.notrika.gympin.ui.main.places.map.FragmentPlacesMap
import com.notrika.gympin.ui.main.survey.FragmentSurveyList
import com.notrika.gympin.ui.main.tickets.FragmentTicketsList
import com.notrika.gympin.ui.main.userProfile.FragmentUserProfile
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun sport_fragment(): FragmentSports

    @ContributesAndroidInjector
    internal abstract fun places_fragmen( ): FragmentPlace
    @ContributesAndroidInjector
    internal abstract fun places_fragmentList(): FragmentPlacesList

    @ContributesAndroidInjector
    internal abstract fun places_fragmentMap(): FragmentPlacesMap

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
    internal abstract fun events_fragment(): FragmentEventListWalking

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
    internal abstract fun event_fragment(): FragmentEventWalking

    @ContributesAndroidInjector
    internal abstract fun create_event_fragment(): FragmentEventCreateWalking

    @ContributesAndroidInjector
    internal abstract fun browser_fragment(): FragmentBrowser

    @ContributesAndroidInjector
    internal abstract fun survey_list_fragment(): FragmentSurveyList

    @ContributesAndroidInjector
    internal abstract fun place_reserve_fragment(): FragmentPlaceReserve

    @ContributesAndroidInjector
    internal abstract fun place_about_fragment(): FragmentPlaceAbout

    @ContributesAndroidInjector
    internal abstract fun place_facilities_fragment(): FragmentPlaceFacilities

    @ContributesAndroidInjector
    internal abstract fun place_stall_fragment(): FragmentStallReserve

    @ContributesAndroidInjector
    internal abstract fun tickets_list_fragment(): FragmentTicketsList
}
