package com.notrika.gympin.ui.main.events.walking.eventCreateWalking

import android.annotation.SuppressLint
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
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.component.map.MapItemEntity
import com.notrika.gympin.util.component.map.MyMapView
import com.notrika.gympin.util.extention.toStringDateFormat
import kotlinx.android.synthetic.main.fragment_event_create_walking.*
import saman.zamani.persiandate.PersianDate
import saman.zamani.persiandate.PersianDateFormat
import java.util.*


class FragmentEventCreateWalking : InnerPageFragment() {

    private lateinit var viewModel: ViewModelEventCreateWalking
    lateinit var peopleAdapter:AdapterEventListWalkingPeople
    lateinit var peopleCountAdapter:AdapterEventListWalkingPeopleCount
    var _startDate: Date? = null


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_event_create_walking, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEventCreateWalking::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        fillListPeopleCount()
        preparePage()
    }

    private fun preparePage() {
        txt_btn_join.setOnClickListener {
            addEvent()
        }
        txt_select_time.setOnClickListener {
            var d = DialogSelectTime(requireActivity(),requestManager,"انتخاب زمان شروع")
                d.show()
            d.onDateSelectListener=object :DialogSelectTime.OnDateSelectListener{
                override fun onDateSelect(startDate: Date) {
                    var pd = PersianDate(startDate)
                    val pdformater1 = PersianDateFormat("l j F ساعت H و i دقیقه")
                    _startDate = startDate
                    txt_select_time.text = pdformater1.format(pd)
                }
            }
        }
        my_map.onPointSelectListener = object: MyMapView.OnPointSelectListener{
            override fun onSelect(mapitem: MapItemEntity) {
                viewModel.requestGetAddress(mapitem.geoPoint!!).observe(viewModel.viewLifecycleOwner, {
                    my_map.setAddress(it.data)

                })
            }

        }
    }

    @SuppressLint("SimpleDateFormat")
    private fun addEvent() {

        var req = Req_event_walking_add()
        if(et_title.text.isNullOrEmpty()){
            et_title.error = "لطفا موضوع را بنویسید"
            return
        }else{
            req.title = et_title.text.toString()
            et_title.error = null

        }
        if(et_desc.text.isNullOrEmpty()){
            et_desc.error = "لطفا توضیح را بنویسید"
            return
        }else{
            req.description = et_desc.text.toString()
            et_desc.error =null

        }
        if(_startDate==null){
            txt_select_time.background = resources.getDrawable(R.drawable._rectangle_radius_strok_red)
            return
        }else{
            txt_select_time.background = resources.getDrawable(R.drawable._rectangle_radius_strok_cyan)
            _startDate.also {
                req.startDate = it.toStringDateFormat()
            }
        }
        if(my_map.address.isNullOrEmpty()){
            ciBar.createAlert(requireActivity() as AppCompatActivity,"مکان درست را انتخاب کنید",CiBar.FAST_CBAR_DURATION).show()
            return
        }else{
            req.address = my_map.address
        }
        if(my_map.geoPoints.size<2){
            ciBar.createAlert(requireActivity() as AppCompatActivity,"مکان درست را انتخاب کنید",CiBar.FAST_CBAR_DURATION).show()
            return
        }else{
            req.startLatitude = my_map.geoPoints[0].geoPoint?.latitude
            req.startLongitude = my_map.geoPoints[0].geoPoint?.longitude
            req.endLatitude = my_map.geoPoints[1].geoPoint?.latitude
            req.endLongitude = my_map.geoPoints[1].geoPoint?.longitude
        }
        if(peopleCountAdapter.selectedItem==9999){
            ciBar.createAlert(requireActivity() as AppCompatActivity,"تعداد همراهان خود را انتخاب کنید",CiBar.FAST_CBAR_DURATION).show()
            return
        }else{
            req.participantCount = peopleCountAdapter.selectedItem+1
        }


        req.sport = Res_sport(1)
        peopleAdapter.peoples.filter { p->p.id!=0.toLong() }.let{
            if(it.isNotEmpty())
                req.participants =it
        }


        viewModel.requestAddWalkingEvent(req).observe(viewModel.viewLifecycleOwner,{
            when (it.status) {
                Resource.Status.SUCCESS -> {
                    findNavController().popBackStack()
                }
                Resource.Status.ERROR -> {
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            addEvent()
                        }
                    })
                    ciBar.createAlert(context as AppCompatActivity, it.message, CiBar.LONG_CBAR_DURATION, action).show()
                }
                Resource.Status.FAILURE->{
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            addEvent()
                        }
                    })
                    ciBar.createAlert(
                        context as AppCompatActivity,
                        it.message,
                        CiBar.LONG_CBAR_DURATION,
                        action
                    ).show()
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                addEvent()
                            }
                        })
                }

            }
        })
    }



    private fun fillListPeopleCount() {
        peopleCountAdapter = AdapterEventListWalkingPeopleCount(requestManager)
        peopleCountAdapter.items = listOf(1,2,3)
        rv_people_count.adapter = peopleCountAdapter
        peopleCountAdapter.onEventSelectListener = object :AdapterEventListWalkingPeopleCount.OnEventSelectListener{
            override fun click(itemCount:Int){
                fillListPeople(itemCount)
            }

        }
        peopleCountAdapter.notifyDataSetChanged()
    }

    fun fillListPeople(itemCount: Int) {
        viewModel.GetFollowings().observe(viewModel.viewLifecycleOwner,{
            when (it.status) {
                Resource.Status.SUCCESS -> {
                    it.data?.let {res->
                        peopleAdapter = AdapterEventListWalkingPeople(requestManager,requireActivity(),pocket,res)
                        peopleAdapter.items = itemCount+1
                        rv_people.adapter = peopleAdapter
                        peopleAdapter.notifyDataSetChanged()
                        peopleAdapter.onEventSelectListener = object :AdapterEventListWalkingPeople.OnEventSelectListener{
                            override fun click(item: Res_User){

                            }
                        }
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {
                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                fillListPeople(itemCount)
                            }
                        })
                }
            }
        })
    }
}
