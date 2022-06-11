package com.notrika.gympin.ui.main.myProfile.editProfile

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.github.dhaval2404.imagepicker.ImagePicker
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.fragment_main_profile_edit.*
import kotlinx.android.synthetic.main.l_main_content_list_item_image.view.*
import java.io.File


class FragmentEditProfile : InnerPageFragment() {

    private lateinit var viewModel: ViewModelEditProfile
    private lateinit var user: Res_User



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_profile_edit, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEditProfile::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        prepare()
        getUserData()
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
    private fun setUserData() {

       user.phoneNumber = edt_mobile.text.toString()
       user.username = edt_user_name.text.toString()
       user.name = edt_name.text.toString()
       user.lastName = edt_last_name.text.toString()
       user.bio = edt_bio.text.toString()
       user.birthday = edt_birthday.text.toString()
       user.email = edt_email.text.toString()
       user.nationalCode = edt_national_code.text.toString()
        viewModel.SetUserData(user).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS -> {
                    fillUserData(it.data!!)
                }
                Resource.Status.ERROR -> {

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

    private fun fillUserData(data: Res_User) {
        user = data
        edt_mobile.setText(pocket.phoneNumber)
        edt_user_name.setText(data.username)
        edt_name.setText(data.name)
        edt_last_name.setText(data.lastName)
        edt_bio.setText(data.bio)
        edt_birthday.setText(data.birthday)
        edt_email.setText(data.email)
        edt_national_code.setText(data.nationalCode)
    }

    private fun prepare() {
        img_user_image.setOnClickListener{
            ImagePicker.with(this)
                .crop(1f,1f)
                .compress(1024)
                .maxResultSize(1080, 1080)
                .createIntent {intent->
                    startForProfileImageResult.launch(intent)
                }
        }
        txt_btn_update.setOnClickListener {
            setUserData()
        }
    }

    private val startForProfileImageResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            val resultCode = result.resultCode
            val data = result.data

            when (resultCode) {
                Activity.RESULT_OK -> {
                    //Image Uri will not be null for RESULT_OK
                    val fileUri = data?.data!!

                    sendImageToServer(fileUri)
                }
                ImagePicker.RESULT_ERROR -> {
                    Toast.makeText(requireContext(), ImagePicker.getError(data), Toast.LENGTH_SHORT).show()
                }
                else -> {
                    Toast.makeText(requireContext(), "Task Cancelled", Toast.LENGTH_SHORT).show()
                }
            }
        }

    private fun sendImageToServer(fileUri: Uri) {

        var file = File(fileUri.path)
        viewModel.sendImageToServer(file).observe(viewModel.viewLifecycleOwner,{
            when(it.status){
                Resource.Status.SUCCESS -> {

                    requestManager.load(fileUri)
                        .placeholder(R.drawable.placeholder_userprofile)
                        .transform(
                            CenterCrop(), RoundedCorners(img_user_image.layoutParams.width / 2)
                        ).into(img_user_image)
                }
                Resource.Status.ERROR -> {

                }
                Resource.Status.LOADING -> {}
                Resource.Status.FAILURE -> {}
                Resource.Status.EMPTY -> {}
                Resource.Status.UNAUTHORIZED -> {
                    (activity as ActivityMain).reautorizationUser(
                        object : onAuthorizeComplete {
                            override fun authorized() {
                                sendImageToServer(fileUri)
                            }
                        })
                }
            }
        })
    }
}
