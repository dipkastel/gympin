import React from 'react'

export default function HomeOneAbout() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section className="about-area pt-130 pb-130">
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
                                <h2 className="section-title mb-35">ورزش بیشتر
                                    <br/>
                                    هزینه کمتر</h2>
                                <p>جیم پین موقعیتی را فراهم کرده تا شما بتوانید با یک بار هزینه از تعداد زیادی مجموعه ورزشی استفاده کرده و سلامت و تن درستی را با هزینه کمتری تجربه کنید. چرا جیم پین؟</p>
                            </div>
                            <div className="about-lists">
                                <ul>
                                    <li><i className="fa fa-check"></i> با یکبار ثبت نام اجازه ورود به همه مراکز را دارید.
                                    </li>
                                    <li><i className="fa fa-check"></i> هزینه پرداختی شما پایین تر از ثبت نام در باشگاه های مختلف است.</li>
                                </ul>
                                <a href="about.html" className="site-btn site-btn__s2 mt-55"><span className="icon icon__black"><i
                                    className="far fa-arrow-left"></i></span> بیشتر بخوانید</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about section end -->    */}
        </>
    )
}
