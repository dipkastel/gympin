package com.notrika.gympin.ui.main.myProfile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.enum.MainDestinationTypes
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.ui.common.widgets.dialogFollow.DialogFollow
import kotlinx.android.synthetic.main.fragment_main_my_profile.*
import kotlinx.android.synthetic.main.main_my_profile_content.*


class FragmentMyProfile : MainPageFragment() {

    private lateinit var viewModel: ViewModelMyProfile


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main_my_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMyProfile::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        getUserData()
        prepare()
        fillMenuList()
    }

    private fun getUserData() {
        viewModel.GetUserData().observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS -> {
                    fillUserData(it.data!!)
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
                                getUserData()
                            }
                        })
                }
            }
        })
    }

    private fun fillUserData(user: Res_User) {
        requestManager.load(user.profileImage)
            .placeholder(R.drawable.placeholder_userprofile)
            .transform(CenterCrop(), RoundedCorners(_img_user.layoutParams.width / 2))
            .into(_img_user)
        txt_user_name.text = user.username
        txt_user_phone_number.text = pocket.phoneNumber
        rb_user_rate.rating = user.rate?:5.0f
//                    txt_user_bio.text = user.bio
        txt_user_followers_count.text = "${user.followersCount} دنبال کننده"
        txt_user_following_count.text = "${user.followingsCount} دنبال شونده"
        txt_user_bio.text = user.bio

    }

    private fun prepare() {
        ll_edit.setOnClickListener {
            var action = FragmentMyProfileDirections.profileToEdit()
            findNavController().navigate(action)
        }
        txt_user_followers_count.setOnClickListener {
            getFolowers()
        }
        txt_user_following_count.setOnClickListener {
            getFolowings()
        }
    }
    private  fun getFolowers(){
        viewModel.GetFollowers().observe(viewModel.viewLifecycleOwner, {
            txt_user_followers_count.visibility = View.VISIBLE
            prg_user_followers_count.visibility = View.GONE
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
                                        FragmentMyProfileDirections.toUserProfile(item.id,item.username)
                                    findNavController().navigate(action)
                                }

                            }
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {
                    txt_user_followers_count.visibility = View.GONE
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
                                getFolowers()
                            }
                        })
                }
            }
        })
    }
    private fun getFolowings() {
        viewModel.GetFollowings().observe(viewModel.viewLifecycleOwner, {
            txt_user_following_count.visibility = View.VISIBLE
            prg_user_following_count.visibility = View.GONE
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
                                        FragmentMyProfileDirections.toUserProfile(item.id,item.username)
                                    findNavController().navigate(action)
                                }

                            }
                    }
                }
                Resource.Status.ERROR -> {
                }
                Resource.Status.LOADING -> {
                    txt_user_following_count.visibility = View.GONE
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
                                getFolowings()
                            }
                        })
                }
            }
        })
    }

    private fun fillMenuList() {
        var menuList: ArrayList<MyMenuItem> = ArrayList()
        menuList.add(MyMenuItem("شرایط و قوانین", R.drawable.ico_lock_user, fun() {
            route(MainDestinationTypes.INNERBROWSER, "http://www.gympin.ir/terms-and-conditions")
        }))
        menuList.add(MyMenuItem("دعوت از دوستان", R.drawable.ico_user_share, fun() {
            route(MainDestinationTypes.INVITEFRIENDS, pocket.userName)
        }))
        menuList.add(MyMenuItem("سوالات متداول", R.drawable.ico_info, fun() {
            route(MainDestinationTypes.OUTERBROWSER, "http://www.gympin.ir/faq")
        }))
        menuList.add(MyMenuItem("امتیاز و بازخورد", R.drawable.ico_user_rate, fun() {
            route(MainDestinationTypes.SURVEYLIST, "")
        }))
        menuList.add(MyMenuItem("تماس با ما", R.drawable.ico_call, fun() {
            route(MainDestinationTypes.INNERBROWSER, "http://www.gympin.ir/contact-us")
        }))
        menuList.add(MyMenuItem("خروج", R.drawable.ico_logout, fun() {
            route(MainDestinationTypes.LOGOUT, "")
        }))
        var adapter = AdapterProfileMenu(requestManager)
        adapter.items = menuList
        list_profile_menu.adapter = adapter
    }

    class MyMenuItem(var title: String, var icon: Int, var Destination: () -> Unit)

}
