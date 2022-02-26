package com.notrika.gympin.ui.main.messages

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.Navigation
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_message
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.ui.register.splash.FragmentSplashDirections
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_messages.*


class FragmentMessages : InnerPageFragment() {

    private lateinit var viewModel: ViewModelMessages



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_messages, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMessages::class.java)
        fillList()
    }

    private fun fillList() {
        var contents = mockdatas().getMessagesMockData(requireContext());
        var adapter = AdapterMessages(requestManager)
        adapter.addItems(contents.data!!)
        adapter.setGotoChatListener(object :AdapterMessages.ChatClickListener{
            override fun ChatClick(item: Res_message) {
                var action = FragmentMessagesDirections.actionMainMessagesToMainMessageChat()
                Navigation.findNavController(requireView()).navigate(action)
            }

        })
        rv_messages.adapter =adapter
        rv_messages.adapter?.notifyDataSetChanged();

    }
}
