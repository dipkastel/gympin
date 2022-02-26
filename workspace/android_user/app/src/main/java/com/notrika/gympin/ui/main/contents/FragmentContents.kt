package com.notrika.gympin.ui.main.contents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_contents.*


class FragmentContents : MainPageFragment() {

    private lateinit var viewModel: ViewModelContents



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_contents, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelContents::class.java)
        fillList()
    }

    private fun fillList() {
        var contents = mockdatas().getContentsMockData(requireContext());
        var adapter = AdapterContents(requestManager)
        adapter.addItems(contents.data!!)
        rv_contents.adapter =adapter
        rv_contents.adapter?.notifyDataSetChanged();

    }
}
