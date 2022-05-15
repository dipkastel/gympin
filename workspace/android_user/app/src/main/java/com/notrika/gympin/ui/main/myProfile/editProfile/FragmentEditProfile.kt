package com.notrika.gympin.ui.main.myProfile.editProfile

import android.app.Activity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.lifecycle.ViewModelProviders
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.github.dhaval2404.imagepicker.ImagePicker
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.fragment_main_profile_edit.*
import kotlinx.android.synthetic.main.l_main_content_list_item_image.view.*


class FragmentEditProfile : InnerPageFragment() {

    private lateinit var viewModel: ViewModelEditProfile



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_profile_edit, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEditProfile::class.java)
        prepare()
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
    }

    private val startForProfileImageResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            val resultCode = result.resultCode
            val data = result.data

            when (resultCode) {
                Activity.RESULT_OK -> {
                    //Image Uri will not be null for RESULT_OK
                    val fileUri = data?.data!!

                    var mProfileUri = fileUri
                    requestManager.load(fileUri)
                        .placeholder(R.drawable.placeholder_userprofile)
                        .transform(
                            CenterCrop(), RoundedCorners(img_user_image.layoutParams.width / 2)
                        ).into(img_user_image)
                }
                ImagePicker.RESULT_ERROR -> {
                    Toast.makeText(requireContext(), ImagePicker.getError(data), Toast.LENGTH_SHORT).show()
                }
                else -> {
                    Toast.makeText(requireContext(), "Task Cancelled", Toast.LENGTH_SHORT).show()
                }
            }
        }
}
