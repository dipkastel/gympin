package com.notrika.gympin.ui.main.userProfile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_base_evets
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.ui.common.widgets.dialogFollow.DialogFollow
import kotlinx.android.synthetic.main.fragment_main_user_profile.*
import kotlinx.android.synthetic.main.fragment_main_user_profile.txt_user_bio
import kotlinx.android.synthetic.main.fragment_main_user_profile.txt_user_name


class FragmentUserProfile : InnerPageFragment() {

    private lateinit var viewModel: ViewModelUserProfile

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_user_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelUserProfile::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        var userId =  arguments?.let {FragmentUserProfileArgs.fromBundle(it).userId}?:0
        var userName =  arguments?.let {FragmentUserProfileArgs.fromBundle(it).userName}?:""
        getUserData(userId,userName)

    }


    private fun getUserData(userId: Long, userName: String) {

        when {
            userId != 0.toLong() -> {
                getUserDataByUserId(userId)
                return
            }
            userName.isNotEmpty() -> {
                getUserDataByUserName(userName)
                return
            }
            else->{
                findNavController().popBackStack()
                return
            }

        }
    }

    private fun getUserDataByUserName(userName: String) {
        viewModel.GetUserDataByUserName(userName).observe(viewModel.viewLifecycleOwner,{

            when(it.status){
                Resource.Status.SUCCESS -> {
                    if(it.data!=null){

                        fillUserData(it.data!!)
                    }else{
                        findNavController().popBackStack()
                    }
                }
                Resource.Status.ERROR -> {
                    findNavController().popBackStack()
                }
                Resource.Status.LOADING -> {}
                Resource.Status.FAILURE -> {}
                Resource.Status.EMPTY -> {}
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getUserDataByUserName(userName)
                            }
                        })
                }
            }
        })

    }

    private fun getUserDataByUserId(userId: Long) {

        viewModel.GetUserDataById(userId).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS -> {
                    if(it.data!=null){
                        fillUserData(it.data!!)
                    }else{
                        findNavController().popBackStack()
                    }
                }
                Resource.Status.ERROR -> {
                    findNavController().popBackStack()
                }
                Resource.Status.LOADING -> {}
                Resource.Status.FAILURE -> {}
                Resource.Status.EMPTY -> {}
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getUserDataByUserId(userId)
                            }
                        })
                }
            }
        })
    }


    private fun fillUserActivity(userId: Long) {

        viewModel.requestGetUserEvents(userId).observe(viewModel.viewLifecycleOwner,{ it ->
            when(it.status){
                Resource.Status.SUCCESS->{
                    it.data?.let { data ->
                        var events = ArrayList<Res_evets_walking>()
                        data.ownedEvents?.let {owned -> events.addAll(owned) }
                        data.ParticipatedEvents?.let {participants -> events.addAll(participants) }
                        var adapter = AdapterUserActivities(requestManager)
                        adapter.addItems(events.map { o->o as Res_base_evets } as ArrayList)
                        rv_user_contents.adapter =adapter
                        rv_user_contents.adapter?.notifyDataSetChanged()
                    }

                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING ->{
                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                fillUserActivity(userId)
                            }
                        })
                }
            }
        })
    }
    private fun fillUserData(data: Res_User) {

        fillUserActivity(data.id)
        setListeners(data)
        txt_user_name.text = data.username
        txt_user_bio.text = data.bio

        img_folow_user.visibility = View.VISIBLE
        prg_folow_user.visibility = View.INVISIBLE
        txt_user_followers_count.visibility = View.VISIBLE
        prg_user_followers_count.visibility = View.INVISIBLE
        txt_user_followers_count.text = "${data.followersCount} دنبال کننده"
        txt_user_following_count.visibility = View.VISIBLE
        prg_user_following_count.visibility = View.INVISIBLE
        txt_user_following_count.text = "${data.followingsCount} دنبال شونده"
    }
    private fun setListeners(data: Res_User) {
        txt_user_followers_count.setOnClickListener {
            getFolowers(data.id)
        }
        txt_user_following_count.setOnClickListener {
            getFolowings(data.id)
        }
        img_folow_user.setOnClickListener{
            followUser(data.id)
        }
        img_message.setOnClickListener {
            var action = FragmentUserProfileDirections.toMessages()
            findNavController().navigate(action)
        }

    }

    private fun followUser(userId: Long) {
        viewModel.Follow(userId).observe(viewModel.viewLifecycleOwner,{
            img_folow_user.visibility = View.INVISIBLE
            prg_folow_user.visibility = View.VISIBLE
            when (it.status) {
                Resource.Status.SUCCESS -> {

                    img_folow_user.visibility = View.VISIBLE
                    prg_folow_user.visibility = View.INVISIBLE
                    getUserData(userId,"")
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {

                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                followUser(userId)
                            }
                        })
                }
            }
        })
    }

    private  fun getFolowers(userId:Long){
        viewModel.GetFollowers(userId).observe(viewModel.viewLifecycleOwner, {
            txt_user_followers_count.visibility = View.VISIBLE
            prg_user_followers_count.visibility = View.INVISIBLE
            when (it.status) {
                Resource.Status.SUCCESS -> {
                    it.data?.let { users ->
                        var d = DialogFollow(requireActivity(), requestManager, "دنبال کنندگان")
                        d.setUsers(users)
                        d.show()
                        d.onUserListItemClickListener =
                            object : DialogFollow.OnUserListItemClickListener {
                                override fun Click(item: Res_User) {
                                    var action =
                                        FragmentUserProfileDirections.toUserProfile(item.id,item.username)
                                    findNavController().navigate(action)
                                }

                            }
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {
                    txt_user_followers_count.visibility = View.INVISIBLE
                    prg_user_followers_count.visibility = View.VISIBLE
                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getFolowers(userId)
                            }
                        })
                }
            }
        })
    }
    private fun getFolowings(userId:Long) {
        viewModel.GetFollowings(userId).observe(viewModel.viewLifecycleOwner, {
            txt_user_following_count.visibility = View.VISIBLE
            prg_user_following_count.visibility = View.INVISIBLE
            when (it.status) {
                Resource.Status.SUCCESS -> {
                    it.data?.let { users ->
                        var d = DialogFollow(requireActivity(), requestManager, "دنبال شوندگان")
                        d.setUsers(users)
                        d.show()
                        d.onUserListItemClickListener =
                            object : DialogFollow.OnUserListItemClickListener {
                                override fun Click(item: Res_User) {
                                    var action =
                                        FragmentUserProfileDirections.toUserProfile(item.id,item.username)
                                    findNavController().navigate(action)
                                }

                            }
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {
                    txt_user_following_count.visibility = View.INVISIBLE
                    prg_user_following_count.visibility = View.VISIBLE
                }
                Resource.Status.FAILURE -> {
                }
                Resource.Status.EMPTY -> {
                }
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                getFolowings(userId)
                            }
                        })
                }
            }
        })
    }


}
