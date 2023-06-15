import '../public/css/style.css'
import '../public/css/preloader.css'
import '../public/css/animate.min.css'
import '../public/css/font-awesome.min.css'
import '../public/css/lightcase.css'
import '../public/css/meanmenu.css'
import '../public/css/nice-select.css'
import '../public/css/magnific-popup.css'
import Head from 'next/head'
import Preloader from '../layouts/Preloader'
import React, { Fragment, useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import '../public/css/bootstrap.rtl.css'
import '../public/fonts/iransansweb/style.css'

function MyApp({ Component, pageProps }) {
  const [activePreLoader, setActivePreLoader] = useState(true);
  useEffect(() => {
      if(detectIEEdge()){
      alert('مرورگر شما این وبسایت را پشتیبانی نمی کند .');
    }
      function detectIEEdge() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)<13;
    }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)<13;
    }

      var edge = ua.indexOf('Edg/');
      if (edge > 0) {
      // Edge => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)<13;
    }

      var samsung = ua.indexOf('SamsungBrowser/');
      if (samsung > 0) {
      // sumsung => return version number
      return parseInt(ua.substring(samsung+15, ua.indexOf('.', samsung)), 10)<15;
    }

      // other browser
      return false;
    }
    setTimeout(() => {
      setActivePreLoader(false);
    }, 3000);
  }, [activePreLoader]);
  return (
    <Fragment>
      <Head>
        <title>جیم پین</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="enamad" content="735379"/>
        <meta name="description" content="printing service template" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link rel="icon" href="images/logo/favicon.ico" />
        <script src="https://www.google.com/recaptcha/api.js"></script>

      </Head>
      {activePreLoader && <Preloader />}
      <GoogleReCaptchaProvider reCaptchaKey="6LdJ3t8lAAAAACj5ztepkxe1UhNFavRqVCFYYViE" >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>

    </Fragment>
  )
}

export default MyApp
