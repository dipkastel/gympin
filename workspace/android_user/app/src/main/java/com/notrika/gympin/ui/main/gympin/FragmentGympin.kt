package com.notrika.gympin.ui.main.gympin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.Home_Item
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_Home_Page_Items
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.com_general_actionbar.view.*
import kotlinx.android.synthetic.main.fragment_main_gympin.*
import javax.inject.Inject


class FragmentGympin : MainPageFragment() {

    private lateinit var viewModel: ViewModelGympin

    @Inject
    lateinit var adapterMainGympin:AdapterGympinMain


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_gympin, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelGympin::class.java)
        fillList()
    }

    private fun fillList() {
        rv_main.adapter =adapterMainGympin
        val data = mockdatas().getHomePageMockData(requireContext());
        adapterMainGympin.addItems(data.data!!)
        adapterMainGympin.onItemClickListener = object:AdapterGympinMain.OnItemClickListener{
            override fun <T: Home_Item> Click(item: T, destination: AdapterGympinMain.MainDestinationType) {
                when(destination){

                    AdapterGympinMain.MainDestinationType.Places -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.Sports -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.OuterBrowser -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.InnerBrowser -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.UserList -> {
                        Toast.makeText(context,(item as Res_Home_Page_Items).title,Toast.LENGTH_SHORT).show()
                        var action = FragmentGympinDirections.toUserProfile()
                        findNavController().navigate(action)
                    }
                    AdapterGympinMain.MainDestinationType.Profile ->{
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.Contents -> {
                        Toast.makeText(context,(item as Res_Home_Page_Items).title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.Discounts -> {
                        Toast.makeText(context,(item as Res_Home_Page_Items).title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.SingleContent -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    AdapterGympinMain.MainDestinationType.SingleDiscount -> {
                        Toast.makeText(context, (item as Res_Home_Page).items?.get(0)?.title,Toast.LENGTH_SHORT).show()
                    }
                    else -> {

                    }
                }
            }


        }
    }

}
