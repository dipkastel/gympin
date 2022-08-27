import React from 'react'

export default function HomeOneAbout() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section id="places" className="about-area pt-130 pb-130">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-6 pr-0">
                            <div className="about__bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/bg/about-bg-1.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-80">
                            <div className="section-header mb-40">
                                <h4 className="sub-heading mb-10">جیم پین</h4>
                                <h3 className=" mb-35">ورزشکاران خود را هوشمند مدیریت کنید</h3>
                                <p>جیم پین موقعیتی را فراهم کرده تا شما بتوانید در یک پلتفرم یکپارچه آنلاین خدمات خود را ارائه کنید و با دریافت گزارشات روند کاری خود را بهبود بخشید.</p>
                            </div>
                            <div className="about-lists">
                                <ul>
                                    <li><i className="fa fa-check"></i>امکان مدیریت ترافیک مرکز
                                    </li>
                                    <li><i className="fa fa-check"></i>امکان مدیریت پرسنل</li>
                                    <li><i className="fa fa-check"></i>گزارشات حرفه ای</li>
                                    <li><i className="fa fa-check"></i>مدیریت پلن ها و تخفیف ها</li>
                                    <li><i className="fa fa-check"></i>اطلاع رسانی کمپین ها</li>
                                    <li><i className="fa fa-check"></i>و ...</li>
                                </ul>
                                <a href="about.html" className="site-btn site-btn__s2 mt-55"><span className="icon icon__black"><i
                                    className="far fa-arrow-left"></i></span> یک قدم تا همکاری</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about section end -->    */}
        </>
    )
}
