package com.notrika.gympin.ui.main.userProfile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_user_profile.*


class FragmentUserProfile : InnerPageFragment() {

    private lateinit var viewModel: ViewModelUserProfile



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_user_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelUserProfile::class.java)
        fillContentList()
    }


    private fun fillContentList() {
        var contents = mockdatas().getContentsMockData(requireContext())
        var adapter = AdapterUserContents(requestManager)
        adapter.addItems(contents.data!!)
        rv_user_contents.adapter =adapter
        rv_user_contents.adapter?.notifyDataSetChanged()
    }

}
