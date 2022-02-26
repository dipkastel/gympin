package com.notrika.gympin.ui.main.myProfile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_content
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.ui.main.sports.AdapterGridViewSport
import com.notrika.gympin.ui.main.sports.OnSportClickListener
import com.notrika.gympin.util.mocks.mockdatas
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
        fillContentList()
    }

    private fun prepare() {
        txt_edit.setOnClickListener {
            var action = FragmentMyProfileDirections.profileToEdit()
            findNavController().navigate(action)
        }
    }

    private fun fillContentList() {
        var contents = mockdatas().getMyContentMockData(requireContext());
        grid_my_content.adapter = AdapterGridViewMyContent(activity, contents.data!!, requestManager, pocket)

        grid_my_content.adapter?.let { adapter ->
            (adapter as AdapterGridViewMyContent).onitemClickLictener = object : OnMyContentClickListener {
                override fun Click(imageView: ImageView, item: Res_content) {

                }

            }
        }
        grid_my_content.adapter?.notifyDataSetChanged();
    }

}
