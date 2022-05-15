package com.notrika.gympin.ui.main.events.walking.eventListWalking

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.fragment_events_list_walking.*


class FragmentEventListWalking : InnerPageFragment() {

    private lateinit var viewModel: ViewModelEventListWalking



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_events_list_walking, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEventListWalking::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        txt_page_title.text = resources.getString(R.string.listOfExistWalkings)
        img_page_title.setImageResource(R.drawable.ico_walking)
        getDatas()
        txt_btn_create.setOnClickListener {
            var action = FragmentEventListWalkingDirections.walkingListToCreateWalking()
            findNavController().navigate(action)
        }
    }

    private fun getDatas() {
        viewModel.requestGetAllSport().observe(viewModel.viewLifecycleOwner,{
            when (it.status) {
                Resource.Status.SUCCESS -> {

                    fillList(it.data!!)
                }
                Resource.Status.ERROR -> {
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getDatas()
                        }
                    })
                    ciBar.createAlert(context as AppCompatActivity, it.message, CiBar.LONG_CBAR_DURATION, action).show()
                }
                Resource.Status.FAILURE->{
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getDatas()
                        }
                    })
                    ciBar.createAlert(
                        context as AppCompatActivity,
                        it.message,
                        CiBar.INFINITY_CBAR_DURATION,
                        action
                    ).show()
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getDatas()
                            }
                        })
                }

            }
        })
    }

    private fun fillList(data:List<Res_evets_walking>) {
        var adapter = AdapterEventListWalking(requestManager)
        adapter.addItems(data)
        rv_events.adapter =adapter
        rv_events.adapter?.notifyDataSetChanged();
        adapter.onEventSelectListener = object :AdapterEventListWalking.OnEventSelectListener{
            override fun click(item: Res_evets_walking) {
                var action = FragmentEventListWalkingDirections.walkingListToWalking(item)
                findNavController().navigate(action)
            }
        }
    }


}
