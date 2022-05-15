package com.notrika.gympin.ui.main.events.walking.eventCreateWalking

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.ContentResolver
import android.content.Context
import android.content.pm.PackageManager
import android.database.Cursor
import android.os.Build
import android.provider.ContactsContract
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.app.ActivityCompat.shouldShowRequestPermissionRationale
import androidx.core.content.ContextCompat
import com.bumptech.glide.RequestManager
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.util.dialog.CBaseDialogContaner
import kotlinx.android.synthetic.main.dialog_select_people.view.*


class DialogSelectPeople constructor(
    var _activity: Activity,
    var requestManager: RequestManager,
    var _title: String,
    var followings: List<Res_User>
) :
    CBaseDialogContaner() {

    var adapterDialogSelectPeople:AdapterDialogSelectPeople?=null

    init {
        initialize(_activity)
        setDialogTitle(_title)
    }


    override fun setView(view: View) {
        val inflater = _activity
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var thisView = inflater.inflate(R.layout.dialog_select_people, null)
        check(thisView,followings)
        super.setView(thisView)
    }

    private fun fillListUsers(thisView: View,followings :List<Res_User>) {

        adapterDialogSelectPeople = AdapterDialogSelectPeople(requestManager)

        adapterDialogSelectPeople?.addContacts(getContactList())
        adapterDialogSelectPeople?.addFollwings(followings)
        thisView.rv_dialog_users.adapter = adapterDialogSelectPeople
        adapterDialogSelectPeople?.notifyDataSetChanged()
        var contacts = getContactList();
        thisView.txt_search.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
            }

            override fun afterTextChanged(p0: Editable?) {
                if(p0.toString().isNullOrEmpty()){
                    adapterDialogSelectPeople?.addContacts(contacts)
                    adapterDialogSelectPeople?.addFollwings(followings)
                    adapterDialogSelectPeople?.notifyDataSetChanged()
                }else{
                    adapterDialogSelectPeople?.addContacts(contacts.filter { p->p.key.uppercase().contains(p0.toString().uppercase()) } as HashMap<String, String>)
                    adapterDialogSelectPeople?.addFollwings(followings.filter { p->p.username?.uppercase()?.contains(p0.toString().uppercase())?:false })
                    adapterDialogSelectPeople?.notifyDataSetChanged()
                }
            }

        })

    }
    fun setUserSelectListener(_onUserSelectListener:AdapterDialogSelectPeople.OnEventSelectListener){
        adapterDialogSelectPeople?.onUserSelectListener = _onUserSelectListener
    }

    @SuppressLint("Range")
    private fun getContactList(): HashMap<String, String> {
        var users: HashMap<String, String> = hashMapOf()
        val cr: ContentResolver = _activity.contentResolver
        val cur: Cursor? = cr.query(
            ContactsContract.Contacts.CONTENT_URI,
            null, null, null, null
        )
        if ((cur?.count ?: 0) > 0) {
            while (cur != null && cur.moveToNext()) {
                val id: String = cur.getString(cur.getColumnIndex(ContactsContract.Contacts._ID))
                val name: String =cur.getString(cur.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME))?:"unknown"
                if (cur.getInt(cur.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER)) > 0) {
                    val pCur: Cursor? = cr.query(
                        ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                        null,
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                        arrayOf(id),
                        null
                    )
                    while (pCur?.moveToNext() == true) {
                        val phoneNo: String? =
                            pCur.getString(pCur.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER))
                        users[name] = phoneNo ?: ""
                    }
                    pCur?.close()
                }
            }
        }
        cur?.close()
        return users;
    }

    private fun check(thisView: View,followings: List<Res_User>) {
        if (ContextCompat.checkSelfPermission(
                _activity,
                Manifest.permission.READ_CONTACTS
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            fillListUsers(thisView,followings)
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (shouldShowRequestPermissionRationale(
                        _activity,
                        Manifest.permission.READ_CONTACTS
                    )
                ) {
                    Toast.makeText(
                        _activity,
                        "Read contacts permission is required to function app correctly",
                        Toast.LENGTH_LONG
                    ).show()
                } else {
                    ActivityCompat.requestPermissions(
                        _activity,
                        arrayOf<String>(Manifest.permission.READ_CONTACTS),
                        1
                    )
                }
            }
        }
    }
}