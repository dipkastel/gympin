package com.notrika.gympin.ui.main.myProfile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.enum.MainDestinationTypes
import com.notrika.gympin.ui.main.MainPageFragment
import kotlinx.android.synthetic.main.fragment_main_my_profile.*
import kotlinx.android.synthetic.main.main_my_profile_content.*


class FragmentMyProfile : MainPageFragment() {

    private lateinit var viewModel: ViewModelMyProfile



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_my_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMyProfile::class.java)
        prepare()
        fillMenuList()
    }

    private fun prepare() {
        txt_edit.setOnClickListener {
            var action = FragmentMyProfileDirections.profileToEdit()
            findNavController().navigate(action)
        }
    }

    private fun fillMenuList() {
        var menuList:ArrayList<MyMenuItem> = ArrayList()
        menuList.add(MyMenuItem("شرایط و قوانین",R.drawable.ico_user_profile,fun (){
           route(MainDestinationTypes.INNERBROWSER,"http://www.gympin.ir/terms-and-conditions")
        }))
        menuList.add(MyMenuItem("دعوت از دوستان",R.drawable.ico_arrow_left,fun (){
           route(MainDestinationTypes.INVITEFRIENDS,pocket.userName)
        }))
        menuList.add(MyMenuItem("سوالات متداول",R.drawable.ico_coin,fun (){
            route(MainDestinationTypes.OUTERBROWSER,"http://www.gympin.ir/faq")
        }))
        menuList.add(MyMenuItem("امتیاز و بازخورد",R.drawable.ico_content_selected,fun (){
            route(MainDestinationTypes.SURVEYLIST,"")
        }))
        menuList.add(MyMenuItem("تماس با ما",R.drawable.ico_dirct,fun (){
            route(MainDestinationTypes.INNERBROWSER,"http://www.gympin.ir/contact-us")
        }))
        menuList.add(MyMenuItem("خروج",R.drawable.ico_home_selected,fun (){
            route(MainDestinationTypes.LOGOUT,"")
        }))
        var adapter = AdapterProfileMenu(requestManager)
        adapter.items = menuList
        list_profile_menu.adapter = adapter
    }

    class MyMenuItem(var title:String,var icon:Int,var Destination :()->Unit)

}
