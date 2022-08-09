package com.notrika.gympin.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin.di.general.utils.viewModel.ViewModelKey
import com.notrika.gympin.ui.main.browser.ViewModelBrowser
import com.notrika.gympin.ui.main.contents.ViewModelContents
import com.notrika.gympin.ui.main.credit.ViewModelCredit
import com.notrika.gympin.ui.main.events.walking.eventCreateWalking.ViewModelEventCreateWalking
import com.notrika.gympin.ui.main.events.walking.eventWalking.ViewModelEventWalking
import com.notrika.gympin.ui.main.gympin.ViewModelGympin
import com.notrika.gympin.ui.main.leaderBoard.ViewModelLeaderBoard
import com.notrika.gympin.ui.main.messages.ViewModelMessages
import com.notrika.gympin.ui.main.messages.chat.ViewModelChat
import com.notrika.gympin.ui.main.myEvents.ViewModelMyEvents
import com.notrika.gympin.ui.main.myProfile.ViewModelMyProfile
import com.notrika.gympin.ui.main.myProfile.editProfile.ViewModelEditProfile
import com.notrika.gympin.ui.main.notifs.ViewModelNotifs
import com.notrika.gympin.ui.main.places.list.ViewModelPlacesList
import com.notrika.gympin.ui.main.settings.ViewModelSettings
import com.notrika.gympin.ui.main.singleContent.ViewModelSingleContent
import com.notrika.gympin.ui.main.sports.ViewModelSports
import com.notrika.gympin.ui.main.events.walking.eventListWalking.ViewModelEventListWalking
import com.notrika.gympin.ui.main.place.ViewModelPlace
import com.notrika.gympin.ui.main.place.subFragments.about.ViewModelPlaceAbout
import com.notrika.gympin.ui.main.place.subFragments.facilities.ViewModelPlaceFacilities
import com.notrika.gympin.ui.main.place.subFragments.reserve.ViewModelPlaceReserve
import com.notrika.gympin.ui.main.place.subFragments.stall.ViewModelStallReserve
import com.notrika.gympin.ui.main.places.map.ViewModelPlacesMap
import com.notrika.gympin.ui.main.survey.ViewModelSurveyList
import com.notrika.gympin.ui.main.tickets.ViewModelTicketsList
import com.notrika.gympin.ui.main.userProfile.ViewModelUserProfile
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class MainViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelGympin::class)
    abstract fun bindGympinViewModel(viewModel: ViewModelGympin): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlace::class)
    abstract fun bindPlaceViewModel(viewModelList: ViewModelPlace): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlacesList::class)
    abstract fun bindPlacesViewModelList(viewModelList: ViewModelPlacesList): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlacesMap::class)
    abstract fun bindPlacesViewModelMap(viewModelList: ViewModelPlacesMap): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelMyProfile::class)
    abstract fun bindProfileViewModel(viewModel: ViewModelMyProfile): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSettings::class)
    abstract fun bindSettingsViewModel(viewModel: ViewModelSettings): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSports::class)
    abstract fun bindSportsViewModel(viewModel: ViewModelSports): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelContents::class)
    abstract fun contentsViewModel(viewModel: ViewModelContents): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelCredit::class)
    abstract fun creditViewModel(viewModel: ViewModelCredit): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelEventListWalking::class)
    abstract fun EventsViewModel(viewModelList: ViewModelEventListWalking): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelLeaderBoard::class)
    abstract fun LeaderBoardViewModel(viewModel: ViewModelLeaderBoard): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelMessages::class)
    abstract fun MessagesViewModel(viewModel: ViewModelMessages): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelMyEvents::class)
    abstract fun MyEventsViewModel(viewModel: ViewModelMyEvents): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelNotifs::class)
    abstract fun NotifsViewModel(viewModel: ViewModelNotifs): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSingleContent::class)
    abstract fun SingleContentViewModel(viewModel: ViewModelSingleContent): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelChat::class)
    abstract fun ChatViewModel(viewModel: ViewModelChat): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelUserProfile::class)
    abstract fun UserProfileViewModel(viewModel: ViewModelUserProfile): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelEditProfile::class)
    abstract fun EditProfileViewModel(viewModel: ViewModelEditProfile): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelEventWalking::class)
    abstract fun EventViewModel(viewModel: ViewModelEventWalking): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelEventCreateWalking::class)
    abstract fun CreateEventViewModel(viewModel: ViewModelEventCreateWalking): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelBrowser::class)
    abstract fun BrowserViewModel(viewModel: ViewModelBrowser): ViewModel


    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSurveyList::class)
    abstract fun SurveyListViewModel(viewModel: ViewModelSurveyList): ViewModel


    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlaceReserve::class)
    abstract fun PlaceReserveViewModel(viewModel: ViewModelPlaceReserve): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlaceAbout::class)
    abstract fun PlaceAboutViewModel(viewModel: ViewModelPlaceAbout): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlaceFacilities::class)
    abstract fun PlaceFacilitiesViewModel(viewModel: ViewModelPlaceFacilities): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelStallReserve::class)
    abstract fun PlaceStallViewModel(viewModel: ViewModelStallReserve): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelTicketsList::class)
    abstract fun ticketListViewModel(viewModel: ViewModelTicketsList): ViewModel

}
