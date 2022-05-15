package com.notrika.gympin.util.general

import android.Manifest
import android.animation.StateListAnimator
import androidx.appcompat.app.AppCompatActivity
import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.graphics.Bitmap
import android.graphics.Typeface
import android.graphics.drawable.BitmapDrawable
import android.hardware.SensorListener
import android.hardware.SensorManager
import android.location.LocationManager
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.os.IBinder
import android.text.Html
import android.util.DisplayMetrics
import android.util.Log
import android.util.TypedValue
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.view.inputmethod.InputMethodManager
import android.widget.ImageView
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import com.notrika.gympin.data.`interface`.OnDoneListener
import dagger.android.support.DaggerAppCompatActivity
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.net.URI
import java.util.*


class Helper {

    private val SHAKE_THRESHOLD = 4000


    fun setShakeListener(context: Context,onDoneListener: OnDoneListener) {

        var last_x = 0f
        var last_y = 0f
        var last_z = 0f
        var lastUpdate: Long = 0
        var sensorMgr = context.getSystemService(DaggerAppCompatActivity.SENSOR_SERVICE) as SensorManager
        sensorMgr.registerListener(object : SensorListener {
            override fun onAccuracyChanged(sensor: Int, accuracy: Int) {

            }

            override fun onSensorChanged(sensor: Int, values: FloatArray) {
                if (sensor == SensorManager.SENSOR_ACCELEROMETER) {
                    val curTime = System.currentTimeMillis()
                    // only allow one update every 100ms.
                    if (curTime - lastUpdate > 100) {
                        val diffTime: Long = curTime - lastUpdate
                        lastUpdate = curTime
                        val x = values[SensorManager.DATA_X]
                        val y = values[SensorManager.DATA_Y]
                        val z = values[SensorManager.DATA_Z]
                        val speed: Float = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000
                        if (speed > SHAKE_THRESHOLD) {
                            onDoneListener.onDone()
                        }
                        last_x = x
                        last_y = y
                        last_z = z
                    }
                }
            }


        },
                SensorManager.SENSOR_ACCELEROMETER,
                SensorManager.SENSOR_DELAY_GAME);
    }
    fun isOnline(context: Context): Boolean {
        try {
            val cm = context
                    .getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            val netInfo = cm.activeNetworkInfo
            return netInfo != null && netInfo.isConnected
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }

    }

    fun checkLocation(context: Context): Boolean {
        var Result = false
        val lm = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        var gpsEnabled = false
        try {
            gpsEnabled = lm.isProviderEnabled(LocationManager.GPS_PROVIDER)
            // Toast.makeText(context, "gps_enabled", Toast.LENGTH_LONG).show();
        } catch (ex: Exception) {
            ex.printStackTrace()
        }

        try {
            if (!gpsEnabled) {
                gpsEnabled = lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
            }
            // Toast.makeText(context, "network_enabled", Toast.LENGTH_LONG).show();
        } catch (ex: Exception) {
        }

        if (gpsEnabled) {
            Result = true
        } else {
            //            DialogConfirm.confirm((Activity) context, context.getResources().getString(R.string.LocationSetting), context.getResources().getString(R.string.EnableGps), "فعال سازی", "بستن", new DialogConfirm.IConfirmResult() {
            //                @Override
            //                public void yes() {
            //                    Intent viewIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            //                    context.startActivity(viewIntent);
            //                    no();
            //                }
            //
            //                @Override
            //                public void no() {
            //
            //                }
            //            });

        }
        return Result
    }

    fun convertToFrasi(str: CharSequence): String {
        return if (!CheckPersianNumber(str.toString())) {
            // if (true) {
            try {
                val arabicChars = charArrayOf('\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669')
                val builder = StringBuilder()
                for (i in 0 until str.length) {
                    if (Character.isDigit(str[i])) {
                        builder.append(arabicChars[str[i].toInt() - 48])
                    } else {
                        builder.append(str[i])
                    }
                }
                builder.toString()
            } catch (e: Exception) {
                e.printStackTrace()
                str.toString()
            }

        } else {
            str.toString()
        }
    }

    fun CheckPersianNumber(Number: String): Boolean {
        var Result = false
        for (i in 0..Number.length - 1) {
            Result = CheckPersianDigit(Number.substring(i, i + 1))
            if (Result)
                break
        }
        return Result
    }

    fun CheckPersianDigit(Digit: String): Boolean {
        var Result = false
        if (Digit == "۰" || Digit == "١" || Digit == "۲" || Digit == "۳" || Digit == "۴" || Digit == "۵" || Digit == "۶" || Digit == "۷" || Digit == "۸" || Digit == "۹") {
            Result = true
        }
        return Result
    }

    fun checkGooglePlayServices(context: Context): Boolean {

        /*  final int status = GooglePlayServicesUtil.isGooglePlayServicesAvailable(context);
        if (status != ConnectionResult.SUCCESS) {
            Locale locale = new Locale("fa");
            Locale.setDefault(locale);
            Configuration config = new Configuration();
            config.locale = locale;
            context.getResources().updateConfiguration(config, null);
            AlertDialog.showAlert((Activity) context, context.getString(R.string.installGooglePlay));
            Dialog dialog = GooglePlayServicesUtil.getErrorDialog(status, (Activity) context, 1);
            dialog.show();
            return false;
        } else {*/

        return true
        //  }
    }

    fun checkLocationGooglePlayServices(activity: androidx.appcompat.app.AppCompatActivity): Boolean {
        var Result = false
        if (checkLocation(activity) && checkGooglePlayServices(activity)) {
            //  if (getAccessLocationFlag) {
            if (ActivityCompat.checkSelfPermission(activity, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), 1)
                Result = false
            } else
                Result = true
            /*      getAccessLocationFlag = false;
            }*/
        }
        return Result
    }

    fun getBoldFont(context: Context): Typeface {
        return Typeface.createFromAsset(context.assets,
                "fonts/IRANSans.ttf")
    }

    fun hideKeyboard(ctx: Context) {
            val inputManager = ctx
                    .getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager

            // check if no view has focus:
            val v = (ctx as androidx.appcompat.app.AppCompatActivity).currentFocus ?: return

            inputManager.hideSoftInputFromWindow(v.windowToken, 0)

    }

    fun closeKeyboard(c: Context, windowToken: IBinder) {
        val mgr = c.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        mgr.hideSoftInputFromWindow(windowToken, 0)
    }

    //    public static CharSequence toRelativeDate(Context context, Date date) {
    //        long diff = Calendar.getInstance().getTimeInMillis() - date.getTime();
    //        diff = Math.max(0, diff);
    //
    //        diff = diff / (60 * 1000); // in minutes
    //        if (diff < 60) {
    //            //diff = Math.min(1, diff);
    //            return context.getResources().getString(R.string.minutes_ago, toPersianDigits("" + diff));
    //        }
    //
    //        diff /= 60; // in hours
    //        if (diff < 24) {
    //            return context.getResources().getString(R.string.hours_ago, toPersianDigits("" + diff));
    //        }
    //
    //        diff /= 24; // in days
    //        if (diff < 30) {
    //            return context.getResources().getString(R.string.days_ago, toPersianDigits("" + diff));
    //        }
    //
    //        diff /= 30; // in months
    //        if (diff < 12) {
    //            return context.getResources().getString(R.string.months_ago, toPersianDigits("" + diff));
    //        }
    //
    //        diff = diff * 30 / 365; // in years
    //        diff = Math.max(0, diff);
    //        return context.getResources().getString(R.string.years_ago, toPersianDigits("" + diff));
    //    }

    fun shareContent(context: Context, title: String?, text: String, url: String?) {
        var titleTxt = ""
        if (title != null)
            titleTxt = title
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "text/plain"
        intent.putExtra(Intent.EXTRA_TEXT, text + "\n\n" + url)
        intent.putExtra(android.content.Intent.EXTRA_SUBJECT,
                "Check My Image ")
        context.startActivity(Intent.createChooser(intent, titleTxt))
    }

    fun shareImage(context: Context, imagePath: URI) {
        val sharingIntent = Intent(Intent.ACTION_SEND)
        sharingIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET)
        sharingIntent.type = "image/*"
        sharingIntent.putExtra(Intent.EXTRA_STREAM, imagePath)
        context.startActivity(Intent.createChooser(sharingIntent, "Share Image Using"))
    }

    fun getLocalBitmapUri(imageView: ImageView): Uri? {
        // Extract Bitmap from ImageView drawable
        val drawable = imageView.drawable
        var bmp: Bitmap? = null
        if (drawable is BitmapDrawable) {
            bmp = (imageView.drawable as BitmapDrawable).bitmap
        } else {
            return null
        }
        // Store image to default external storage directory
        var bmpUri: Uri? = null
        try {
            val file = File(Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS), "share_image_" + System.currentTimeMillis() + ".png")
            file.parentFile.mkdirs()
            val out = FileOutputStream(file)
            bmp!!.compress(Bitmap.CompressFormat.PNG, 90, out)
            out.close()
            bmpUri = Uri.fromFile(file)
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return bmpUri
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    fun setVisibilityAnimation(context: Context, view: View, animat: Int, iResult: IResult) {
        val animation = AnimationUtils.loadAnimation(context, animat)

        //view.setAnimation(animation);
        //ic_h_boy.setVisibility(View.VISIBLE);
        // animation(ic_h_boy);
        view.stateListAnimator = StateListAnimator()
        animation.setAnimationListener(object : Animation.AnimationListener {
            override fun onAnimationStart(animation: Animation) {
            }

            override fun onAnimationEnd(animation: Animation) {
                view.visibility = View.VISIBLE
                iResult.result(true)
            }

            override fun onAnimationRepeat(animation: Animation) {
            }
        })
    }


    fun isTablet(context: Context): Boolean {
        return context.resources.configuration.screenLayout and Configuration.SCREENLAYOUT_SIZE_MASK >= Configuration.SCREENLAYOUT_SIZE_LARGE
    }

    fun html2text(html: String): String {
        return Html.fromHtml(html).toString()
    }

    fun dpToPx(context: Context, dp: Float): Float {
        val displayMetrics = context.resources.displayMetrics
        return dp * (displayMetrics.xdpi / DisplayMetrics.DENSITY_DEFAULT)
    }

    fun dpToPxInt(context: Context, dp: Float): Int {
        val displayMetrics = context.resources.displayMetrics
        return Math.round(dp * (displayMetrics.xdpi / DisplayMetrics.DENSITY_DEFAULT))
    }

    fun spToPxInt(sp: Float, context: Context): Int {
        return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, sp, context.resources.displayMetrics).toInt()
    }

    interface IResult {
        fun result(result: Boolean)
    }

    fun setBackgroundDrawble(view: View, context: Context, drawable: Int) {
        val sdk = android.os.Build.VERSION.SDK_INT
        if (sdk < android.os.Build.VERSION_CODES.JELLY_BEAN) {
            view.setBackgroundDrawable(context.resources.getDrawable(drawable))
        } else {
            view.background = context.resources.getDrawable(drawable)
        }
    }

    fun checkEnglishlanguage(): Boolean {
        var flag = false
        if (Locale.getDefault().displayLanguage == "English")
            flag = true
        return flag
    }

    @Throws(PackageManager.NameNotFoundException::class)
    fun getVersionName(activity: androidx.appcompat.app.AppCompatActivity): String {
        val packageInfo = activity.packageManager.getPackageInfo("com.notrika.gympin", 0)
        return packageInfo.versionName
    }

    fun isValidEmail(email: CharSequence?): Boolean {
        return if (email == null) {
            false
        } else {
            android.util.Patterns.EMAIL_ADDRESS.matcher(email)
                    .matches()
        }
    }

    fun isAppIsInBackground(context: Context): Boolean {
        var isInBackground = true
        try {
            val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT_WATCH) {
                val runningProcesses = am.runningAppProcesses
                for (processInfo in runningProcesses) {
                    if (processInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                        for (activeProcess in processInfo.pkgList) {
                            if (activeProcess == context.packageName) {
                                isInBackground = false
                            }
                        }
                    }
                }
            } else {
                val taskInfo = am.getRunningTasks(1)
                val componentInfo = taskInfo[0].topActivity
                if (componentInfo?.packageName == context.packageName) {
                    isInBackground = false
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return isInBackground
    }

    companion object {
        private val i = 0
        private val PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
        private val rightMenuSelectedIndex: Int = 0

//
//        fun hideBottomNav(fragment: Fragment) {
//
//            fragment.viewLifecycleOwner.lifecycle.addObserver(object : LifecycleObserver {
//
//                @OnLifecycleEvent(Lifecycle.Event.ON_CREATE)
//                fun connectListener() {
//
//
//                    val animator = ValueAnimator.ofFloat(0f, 1f)
//                    animator.duration = 1000
//                    var Height = 0
//                    fragment.activity?.bottom_nav?.let {
//                        Height = it.height
//                    }
//                    animator.addUpdateListener { an ->
//                        fragment.activity?.bottom_nav?.translationY = (an.animatedValue as Float) * Height
//                        if (an.currentPlayTime > 99) {
//                            fragment.activity?.bottom_nav?.visibility = View.GONE
//                        }
//                    }
//                    animator.start()
//
//                }
//
//                @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
//                fun disconnectListener() {
//
//
//                    val animator = ValueAnimator.ofFloat(0f, 1f)
//                    animator.duration = 1000
//                    var Height = 0
//                    fragment.activity?.bottom_nav?.let {
//                        Height = it.height
//                    }
//                    animator.addUpdateListener { an ->
//                        fragment.activity?.bottom_nav?.translationY = -1 + (an.animatedValue as Float) * Height
//                        if (an.currentPlayTime < 1) {
//                            if (fragment.activity?.bottom_nav?.visibility != View.VISIBLE)
//                                fragment.activity?.bottom_nav?.visibility = View.VISIBLE
//                        }
//                    }
//                    animator.start()
//
//                }
//            }
//            )
//        }
//

        fun deleteCache(context: Context):Boolean {
            try {
                val dir = context.cacheDir
               return deleteDir(dir)
            } catch (e: java.lang.Exception) {
                e.printStackTrace()
                return false
            }
        }

        private fun deleteDir(dir: File?): Boolean {
            return if (dir != null && dir.isDirectory) {
                val children = dir.list()
                for (i in children.indices) {
                    val success = deleteDir(File(dir, children[i]))
                    if (!success) {
                        return false
                    }
                }
                dir.delete()
            } else if (dir != null && dir.isFile) {
                dir.delete()
            } else {
                false
            }
        }
    }

}
