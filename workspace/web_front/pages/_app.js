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
import { Fragment, useEffect, useState } from "react";
import '../public/css/bootstrap.rtl.css'
import '../public/fonts/iransansweb/style.css'

function MyApp({ Component, pageProps }) {
  const [activePreLoader, setActivePreLoader] = useState(true);
  useEffect(() => {
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
        <meta name="description" content="printing service template" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link rel="icon" href="images/logo/favicon.ico" />
      </Head>      
      {activePreLoader && <Preloader />}
      <Component {...pageProps} />

    </Fragment>
  )
}

export default MyApp
