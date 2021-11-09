package com.notrika.gympin.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin.di.ViewModelKey
import com.notrika.gympin.ui.main.MyContents.ViewModelMyContents
import com.notrika.gympin.ui.main.contents.ViewModelContents
import com.notrika.gympin.ui.main.credit.ViewModelCredit
import com.notrika.gympin.ui.main.events.ViewModelEvents
import com.notrika.gympin.ui.main.gympin.ViewModelGympin
import com.notrika.gympin.ui.main.leaderBoard.ViewModelLeaderBoard
import com.notrika.gympin.ui.main.messages.ViewModelMessages
import com.notrika.gympin.ui.main.myEvents.ViewModelMyEvents
import com.notrika.gympin.ui.main.notifs.ViewModelNotifs
import com.notrika.gympin.ui.main.places.ViewModelPlaces
import com.notrika.gympin.ui.main.profile.ViewModelProfile
import com.notrika.gympin.ui.main.settings.ViewModelSettings
import com.notrika.gympin.ui.main.singleContent.ViewModelSingleContent
import com.notrika.gympin.ui.main.sports.ViewModelSports
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
    @ViewModelKey(ViewModelProfile::class)
    abstract fun bindProfileViewModel(viewModel: ViewModelProfile): ViewModel

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
    @ViewModelKey(ViewModelEvents::class)
    abstract fun EventsViewModel(viewModel: ViewModelEvents): ViewModel

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
    @ViewModelKey(ViewModelMyContents::class)
    abstract fun MyContentsViewModel(viewModel: ViewModelMyContents): ViewModel

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

}
