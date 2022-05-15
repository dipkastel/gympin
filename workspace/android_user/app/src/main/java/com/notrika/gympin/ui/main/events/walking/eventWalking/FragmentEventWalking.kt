package com.notrika.gympin.ui.main.events.walking.eventWalking

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.ui.common.widgets.dialogConfirm.DialogConfirm
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.extention.toPersianDate
import com.notrika.gympin.util.general.GeneralConstants
import kotlinx.android.synthetic.main.fragment_event_walking.*
import org.osmdroid.util.GeoPoint
import saman.zamani.persiandate.PersianDateFormat
import javax.inject.Inject


class FragmentEventWalking : InnerPageFragment() {

    private lateinit var viewModel: ViewModelEventWalking
    lateinit var item :Res_evets_walking

    @Inject
    lateinit var dialogConfirm: DialogConfirm

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {

        item = FragmentEventWalkingArgs.fromBundle(requireArguments()).walkingItem
        return inflater.inflate(R.layout.fragment_event_walking , container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEventWalking::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        fillPage()
    }

    private fun fillPage() {
        txt_capacity_count.text = "${item.participantCount?.minus(item.participants?.size?:0)}/${item.participantCount}"
        txt_page_title.text = item.title
        txt_page_desc.text = item.description
        txt_place_address.text = item.address
        var pd=item.startDate.toPersianDate()
        txt_date.text = "${pd.shDay} ${pd.monthName()}"
        txt_time.text = PersianDateFormat("H:i").format(pd)
        my_map.setSelectedLocation(GeoPoint(item.startLatitude?: GeneralConstants.TEHRAN_LATITUDE,item.startLongitude?: GeneralConstants.TEHRAN_LONGITUDE))
        fillListParticipants()
        if(item.owner?.id==pocket.userId){
            txt_btn_join.setBackgroundColor(resources.getColor(R.color.Red_gympin))
            txt_btn_join.text = resources.getString(R.string.cancel_event)
            txt_btn_join.setOnClickListener {
                cancelEvent()
            }
        }else if(item.participants?.filter { p->p.id==pocket.userId }?.any() == true){
            txt_btn_join.setBackgroundColor(resources.getColor(R.color.Red_gympin))
            txt_btn_join.text = resources.getString(R.string.cancel_join)
            txt_btn_join.setOnClickListener {
                cancelJoin()

            }
        }else{
            txt_btn_join.setOnClickListener {
                dialogConfirm?.init(requireActivity())
                    ?.setTitle("تایید ورود به ایونت")
                    ?.setMessage("آیا از شرکت در این ایونت اطمینان دارید \n عضویت در ایونت و عدم شرکت باعث کسر امتیاز شدید خواهد شد \n لذا اگر در هر صورتی امکان شرکت در ایونت را ندارید ...")
                    ?.setAction(object :DialogConfirm.OnAction{
                        override fun Confirm() {
                            joinToEvent()
                        }

                        override fun Dismiss() {
                        }
                    })
                    ?.show()
            }
        }
    }

    private fun cancelEvent() {

        viewModel.cancelEvent(item.id).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS->{
                    findNavController().popBackStack()
                }
                Resource.Status.ERROR -> {
                    ciBar.createAlert(requireActivity(),it.message,CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE -> {
                    ciBar.createAlert(requireActivity(),"failer",CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                cancelEvent()
                            }
                        })
                }
            }
        })
    }

    private fun cancelJoin() {
        viewModel.cancelJoinToEvent(item.id).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS->{
                    findNavController().popBackStack()
                }
                Resource.Status.ERROR -> {
                    ciBar.createAlert(requireActivity(),it.message,CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE -> {
                    ciBar.createAlert(requireActivity(),"failer",CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                cancelJoin()
                            }
                        })
                }
            }
        })
    }

    private fun joinToEvent() {
        viewModel.joinToEvent(item.id).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS->{
                    findNavController().popBackStack()
                }
                Resource.Status.ERROR -> {
                    ciBar.createAlert(requireActivity(),it.message,CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE -> {
                    ciBar.createAlert(requireActivity(),"failer",CiBar.LONG_CBAR_DURATION).show()
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                joinToEvent()
                            }
                        })
                }
            }
        })
    }

    private fun fillListParticipants() {
        var adapter=AdapterEventListWalkingPeople(requestManager)
        adapter.items = item
        rv_event_users.adapter = adapter
        adapter.onUserSelectListener = object :AdapterEventListWalkingPeople.OnUserSelectListener{
            override fun click(item: Res_User) {
                var action = FragmentEventWalkingDirections.toUserProfile(item.id,item.username!!)
                findNavController().navigate(action)
            }
        }
        adapter.notifyDataSetChanged()
    }
}
