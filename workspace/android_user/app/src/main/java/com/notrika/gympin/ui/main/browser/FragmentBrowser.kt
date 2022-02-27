package com.notrika.gympin.ui.main.browser

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebViewClient
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.fragment_browser.*


class FragmentBrowser : InnerPageFragment(){

    private lateinit var viewModel: ViewModelBrowser



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_browser, container, false)
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelBrowser::class.java)

        val url:String =  arguments?.let {
            FragmentBrowserArgs.fromBundle(it).url
        }?:"http://gympin.ir"

        main_webview.webChromeClient =chromeClient
        main_webview.webViewClient = viewClient
        main_webview.clearCache(true);
        main_webview.clearHistory();
        main_webview.settings.javaScriptEnabled = true;
        main_webview.settings.javaScriptCanOpenWindowsAutomatically = true;
        main_webview.loadUrl(url)


    }
    private var viewClient = object: WebViewClient(){

    }
    private var chromeClient = object: WebChromeClient(){

    }

}

