package com.notrika.gympin.ui.main.credit

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_credit.*


class FragmentCredit : InnerPageFragment() {

    private lateinit var viewModel: ViewModelCredit



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_credit, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelCredit::class.java)


        fillListprices()
        fillListMarket()
    }

    private fun fillListprices() {
        var contents = listOf("20000","40000","80000","200000")
        var adapter = AdapterPrices()
        adapter.addItems(contents)
        rv_price.adapter =adapter
        rv_price.adapter?.notifyDataSetChanged();
    }

    private fun fillListMarket() {
        var contents = mockdatas().getMarketMockData(requireContext())
        var adapter = AdapterMarket(requestManager)
        adapter.addItems(contents.data!!)
        rv_market.adapter =adapter
        rv_market.adapter?.notifyDataSetChanged();

    }

}
