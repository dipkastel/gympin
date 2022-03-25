package com.notrika.gympin.ui.main.gympin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.enum.MainDestinationTypes
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.entity.Home_Item
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_Home_Page_Items
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_gympin.*
import kotlinx.android.synthetic.main.fragment_main_sports.*
import javax.inject.Inject


class FragmentGympin : MainPageFragment() {

    private lateinit var viewModel: ViewModelGympin

    @Inject
    lateinit var adapterMainGympin: AdapterGympinMain


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main_gympin, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelGympin::class.java)
        getHome()
    }

    private fun getHome() {
        viewModel.requestGetHomeData().observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Resource.Status.SUCCESS -> {
                    fillList(it.data!!)
                }
                Resource.Status.ERROR -> {
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getHome()
                        }
                    })
                    ciBar.createAlert(
                        context as AppCompatActivity,
                        it.message,
                        CiBar.INFINITY_CBAR_DURATION,
                        action
                    ).show()
                }
                Resource.Status.FAILURE->{
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getHome()
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
                    (activity as ActivityMain).reautorizationUser(requireActivity(),
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getHome()
                            }
                        })
                }
            }
        })
    }

    private fun fillList(data: List<Res_Home_Page>) {
        rv_main.adapter = adapterMainGympin
        adapterMainGympin.addItems(data)
        adapterMainGympin.onItemClickListener = object : AdapterGympinMain.OnItemClickListener {
            override fun <T : Home_Item> Click(item: T) {
                if (item is Res_Home_Page_Items) {
                    route(MainDestinationTypes.valueOf(item.destination.toString()), item.data)
                } else if (item is Res_Home_Page) {
                    route(
                        MainDestinationTypes.valueOf(item.items?.get(0)?.destination.toString()),
                        item.items?.get(0)?.data ?: ""
                    )
                }

            }


        }
    }

}
