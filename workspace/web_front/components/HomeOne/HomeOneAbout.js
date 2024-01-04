import React from 'react'

export default function HomeOneAbout() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section id="places" className="about-area pt-70 pb-70">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-6 pr-0">
                            <div className="about__bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/bg/about-bg-1.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-80">
                            <div className="section-header mb-40">
                                <h3 className=" mb-35">برخی امکانات جیم پین</h3>
                            </div>
                            <div className="about-lists">
                                <ul>
                                    <li><i className="fa fa-check"></i>اپلیکیشن اختصاصی ویژه شرکت ها</li>
                                    <li><i className="fa fa-check"></i>بدون محدودیت در اندازه سازمان</li>
                                    <li><i className="fa fa-check"></i>امکان پرداخت های متفاوت (پلکانی)</li>
                                    <li><i className="fa fa-check"></i>مدیریت آسان پرسنل</li>
                                    <li><i className="fa fa-check"></i>عدم اتلاف بودجه رفاهی سازمان</li>
                                    <li><i className="fa fa-check"></i>مجموعه های مورد علاقه کارمندان</li>
                                    <li><i className="fa fa-check"></i>بررسی و مقایسه امکانات مراکز</li>
                                    <li><i className="fa fa-check"></i>همه سازمان ها با هر بودجه ای</li>
                                    <li><i className="fa fa-check"></i>گروهبندی پرسنل (افزایش اعتبار گروهی)</li>
                                    <li><i className="fa fa-check"></i>گزارشات ویژه سازمان ها</li>
                                    <li><i className="fa fa-check"></i>و...</li>
                                </ul>
                                <a href="https://corporate.gympin.ir/auth/register" className="site-btn site-btn__s2 mt-55"><span className="icon icon__black"><i
                                    className="far fa-arrow-left"></i></span> یک قدم تا ورزش</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about section end -->    */}
        </>
    )
}
