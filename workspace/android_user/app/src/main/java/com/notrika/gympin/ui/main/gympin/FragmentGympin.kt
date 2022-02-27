package com.notrika.gympin.ui.main.gympin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.data.enum.MainDestinationTypes
import com.notrika.gympin.data.model.entity.Home_Item
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_Home_Page_Items
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
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
            override fun <T: Home_Item> Click(item: T) {
                if(item is Res_Home_Page_Items){
                    route(MainDestinationTypes.valueOf(item.destination.toString()),item.data)
                }else if(item is Res_Home_Page){
                    route(MainDestinationTypes.valueOf(item.items?.get(0)?.destination.toString()),item.items?.get(0)?.data?:"")
                }

            }


        }
    }

}
