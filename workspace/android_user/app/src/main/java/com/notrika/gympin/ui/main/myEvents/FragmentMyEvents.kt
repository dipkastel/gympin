package com.notrika.gympin.ui.main.myEvents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.*
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.MainPageFragment
import kotlinx.android.synthetic.main.fragment_main_my_events.*
import javax.inject.Inject


class FragmentMyEvents : MainPageFragment() {

    private lateinit var viewModel: ViewModelMyEvents


    @Inject
    lateinit var adapterMyEvents: AdapterMyEvents


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_my_events, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMyEvents::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        getMyEvents()
    }

    override fun onResume() {
        super.onResume()
        getMyEvents()
    }

    private fun getMyEvents() {
        viewModel.requestGetMyEvents().observe(viewModel.viewLifecycleOwner,{ it ->
            when(it.status){
                Resource.Status.SUCCESS->{
                    it.data?.let { data ->
                        var events = ArrayList<Res_evets_walking>()
                        data.ownedEvents?.let {owned -> events.addAll(owned) }
                        data.ParticipatedEvents?.let {participants -> events.addAll(participants) }
                        fillList(events)
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                        override fun authorized() {
                            getMyEvents()
                        }
                    })
                }
            }
        })
    }

    private fun fillList(data: List<Res_evets_walking>) {
        rv_user_contents.adapter = adapterMyEvents
        adapterMyEvents.addItems(data)
        adapterMyEvents.onEvenetClickListener = object :AdapterMyEvents.OnEvenetClickListener{
            override fun click(event: Res_evets_walking) {
                var action = FragmentMyEventsDirections.myEventsToWalking(event)
                findNavController().navigate(action)
            }

            override fun share(event: Res_evets_walking) {
                val intent = Intent(Intent.ACTION_SEND)
                val shareBody = resources.getString(R.string.share_event,event.title,pocket.userName)
                intent.type = "text/plain"
                intent.putExtra(Intent.EXTRA_SUBJECT,getString(R.string.share_subject))
                intent.putExtra(Intent.EXTRA_TEXT, shareBody)
                startActivity(Intent.createChooser(intent,getString(R.string.share_using)))
            }
        }
    }

}
