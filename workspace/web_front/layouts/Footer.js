import React from 'react'

export default function Footer() {
    return (
        <>

            {/* <!-- footer start --> */}
            <footer className="footer footer__2 pt-120 rtl">
                <div className="container-fluid">
                    <div className="row mt-none-50 justify-content-center">
                        <div className="col-xl-2 col-lg-3 mt-50">
                            <a href="index.html" className="footer__logo">
                                <img src="/images/logo/logo-white.png" alt="" />
                            </a>
                            <br/>
                            <br/>
                            <div className="footer-widget footer-widget__2">
                                <ul>
                                    <li><a href="service-details.html">قوانین و مقررات<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">حریم شخصی<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">سوالات متداول<i className="fa fa-angle-left"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 mt-50 pl-45 pr-0">
                            <div className="footer-widget footer-widget__2">
                                <h4 className="widget-title">خدمات</h4>
                                <ul>
                                    <li><a href="service-details.html">پیشنهادات ورزشی<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">رویداد ها<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">شرکت ها<i className="fa fa-angle-left"></i></a>
                                    </li>
                                    <li><a href="service-details.html">فروشگاه<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">وبلاگ<i className="fa fa-angle-left"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-5 mt-50 pl-70 pr-0">
                            <div className="footer-widget footer-widget__2">
                                <h4 className="widget-title">پیگیری ها</h4>

                                <ul>
                                    <li><a href="service-details.html">اخبار<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">اخبار شرکت ها<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">پشتیبانی<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">برند ما<i className="fa fa-angle-left"></i></a></li>
                                    <li><a href="service-details.html">تماس با ما<i className="fa fa-angle-left"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 mt-50">
                            <div className="footer-widget footer-widget__2">
                                <div className="newslater ltr">
                                    <h4 className="newslater__title">عضویت در خبرنامه</h4>
                                    <div className="newslater__form">
                                        <form action="index.html">
                                            <input type="email" name="email" id="email" placeholder="Enter Email" />
                                            <button type="submit"><i className="far fa-paper-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom footer__bottom--2 mt-115">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 my-auto">
                                <div className="copyright-text">
                                    <p>تمامی حقوق متعلق به <a href="https://themeforest.net/user/theme_pure">جیم پین &copy;</a> میباشد.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="social__links social__links--2">
                                    <a href="#0"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#0"><i className="fab fa-twitter"></i></a>
                                    <a href="#0"><i className="fab fa-pinterest-p"></i></a>
                                    <a href="#0"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- footer end --> */}
        </>
    )
}
