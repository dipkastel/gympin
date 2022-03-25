package com.notrika.gympin.ui.main.notifs

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_notification
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_notifs.*


class FragmentNotifs : InnerPageFragment() {

    private lateinit var viewModel: ViewModelNotifs



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_notifs, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelNotifs::class.java)
        fillList()
    }

    private fun fillList() {
            var contents = mockdatas().getNotifsMockData(requireContext());
        var adapter = AdapterNotifs(requestManager)
        rv_notif.adapter =adapter
        adapter.addItems(contents.data!!)
        adapter.onItemClickListener = object :AdapterNotifs.OnItemClickListener{
            override fun click(item: Res_notification) {
                DialogMessageDetail(requireActivity(),item.title!!,item.description!!).show()
            }

        }

    }

}
