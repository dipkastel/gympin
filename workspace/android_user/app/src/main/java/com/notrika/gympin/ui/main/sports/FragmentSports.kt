package com.notrika.gympin.ui.main.sports

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.MainPageFragment
import kotlinx.android.synthetic.main.fragment_main_sports.*


class FragmentSports : MainPageFragment() {

    private lateinit var viewModel: ViewModelSports


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main_sports, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelSports::class.java)
        getsports()
    }

    private fun getsports() {
        viewModel.requestGetAllSport().observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {

                    setupRecyclerView(grid_sport, baseSetting.data!!)
                }
                Resource.Status.ERROR -> {

                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(requireActivity(),
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getsports()
                            }
                        })
                }

            }
        })
    }


    private fun setupRecyclerView(recyclerView: RecyclerView, sports: List<Res_sport>) {

        recyclerView.adapter = AdapterGridViewSport(activity, sports, requestManager, pocket)

        recyclerView.adapter?.let { adapter ->
            (adapter as AdapterGridViewSport).onitemClickLictener = object : OnSportClickListener {
                override fun Click(imageView: ImageView, item: Res_sport) {
                    var action = FragmentSportsDirections.sportsToEvents()
                    findNavController().navigate(action)
                }

            }
        }
        recyclerView.adapter?.notifyDataSetChanged();
    }


}
