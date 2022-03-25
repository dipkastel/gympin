package com.notrika.gympin.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin.di.ViewModelKey
import com.notrika.gympin.ui.main.browser.ViewModelBrowser
import com.notrika.gympin.ui.main.contents.ViewModelContents
import com.notrika.gympin.ui.main.credit.ViewModelCredit
import com.notrika.gympin.ui.main.events.createEvent.ViewModelCreateEvent
import com.notrika.gympin.ui.main.events.event.ViewModelEvent
import com.notrika.gympin.ui.main.gympin.ViewModelGympin
import com.notrika.gympin.ui.main.leaderBoard.ViewModelLeaderBoard
import com.notrika.gympin.ui.main.messages.ViewModelMessages
import com.notrika.gympin.ui.main.messages.chat.ViewModelChat
import com.notrika.gympin.ui.main.myEvents.ViewModelMyEvents
import com.notrika.gympin.ui.main.myProfile.ViewModelMyProfile
import com.notrika.gympin.ui.main.myProfile.editProfile.ViewModelEditProfile
import com.notrika.gympin.ui.main.notifs.ViewModelNotifs
import com.notrika.gympin.ui.main.places.ViewModelPlaces
import com.notrika.gympin.ui.main.settings.ViewModelSettings
import com.notrika.gympin.ui.main.singleContent.ViewModelSingleContent
import com.notrika.gympin.ui.main.sports.ViewModelSports
import com.notrika.gympin.ui.main.sports.eventsList.ViewModelEventsList
import com.notrika.gympin.ui.main.survey.ViewModelSurveyList
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
    @ViewModelKey(ViewModelPlaces::class)
    abstract fun bindPlacesViewModel(viewModel: ViewModelPlaces): ViewModel

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
    @ViewModelKey(ViewModelEventsList::class)
    abstract fun EventsViewModel(viewModelList: ViewModelEventsList): ViewModel

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
    @ViewModelKey(ViewModelEvent::class)
    abstract fun EventViewModel(viewModel: ViewModelEvent): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelCreateEvent::class)
    abstract fun CreateEventViewModel(viewModel: ViewModelCreateEvent): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelBrowser::class)
    abstract fun BrowserViewModel(viewModel: ViewModelBrowser): ViewModel


    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSurveyList::class)
    abstract fun SurveyListViewModel(viewModel: ViewModelSurveyList): ViewModel

}
