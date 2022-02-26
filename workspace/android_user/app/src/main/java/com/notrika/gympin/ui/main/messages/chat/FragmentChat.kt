package com.notrika.gympin.ui.main.messages.chat

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_last_chat
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_messages_chat.*


class FragmentChat : InnerPageFragment() {

    private lateinit var viewModel: ViewModelChat



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_messages_chat, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelChat::class.java)
        prepareView()

    }

    private fun prepareView() {
        var contents = mockdatas().getChatMockData(requireContext());
        lbl_user.text = contents.data?.users?.name
        fillList(contents)
    }

    private fun fillList(contents: OprationResult<Res_last_chat>) {
        var adapter = AdapterChat(requestManager)
        contents.data?.lastChats?.let {
            adapter.addItems(it)
        }
        rv_chat.adapter =adapter
        rv_chat.adapter?.notifyDataSetChanged();

    }
}
