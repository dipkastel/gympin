package com.notrika.gympin.ui.main.place

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter

class AdapterPlacePager(
    fa: FragmentActivity,
    vararg fr: Pair<Fragment,String>
) : FragmentStateAdapter(fa) {
    var fragments: Array<out Pair<Fragment, String>> = fr
    override fun getItemCount(): Int = fragments.size

    override fun createFragment(position: Int): Fragment {
        return fragments[position].first
    }


}