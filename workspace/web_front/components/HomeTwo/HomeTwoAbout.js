import React from 'react'

export default function HomeTwoAbout() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section className="about-area pt-125 pb-125">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-5">
                            <div className="about__bg about__bg--2 mt-75">
                                <div className="big-thumb">
                                    <img src="/images/about/about-bg-1.jpg" alt="" />
                                </div>
                                <div className="mid-thumb position-absulate">
                                    <img src="/images/about/about-bg-2.jpg" alt="" />
                                </div>
                                <div className="small-thumb position-absulate">
                                    <img src="/images/about/about-bg-3.jpg" alt="" />
                                </div>
                                <span className="circle-shape position-absulate"><img src="/images/shape/border-shape-2.png" alt="" /></span>
                                <span className="patternt-shape position-absulate"><img src="/images/shape/about-shape-1.png" alt="" /></span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="section-header section-header__2 mb-40">
                                <h4 className="sub-heading sub-heading__2 mb-10">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-10" alt="" /></span>
                                    چرا جیم پین
                                </h4>
                                <h2 className="section-title section-title__2 mb-30">افزایش انرژی سازمان با آفرهای ورزشی</h2>
                                <p className="rtl">فرهنگ سازمانی خود را با افزودن رویداد های ورزشی متحول کنید .</p>
                                <p className="rtl">پرسنل را به ورزش ترغیب کنید و مجموعه ای پر انرژی بسازید .</p>
                                <p className="rtl">سلامتی را به شرکت خود بازگردانید و به بازدهی بالاتری برسید.</p>
                                <p className="rtl">با جیم پبن همه ورزش ها در دسترس خواهند بود . </p>
                            </div>
                            <div className="row mt-none-40">
                                <div className="col-xl-6 mt-40">
                                    <div className="ab__box rtl">
                                        <div className="ab__box--head">
                                            <div className="icon">
                                                <img src="/images/icons/ab-1.png" alt="" />
                                            </div>
                                            <h4 className="title">یک پلن <br/>
                                                انتخاب کنید</h4>
                                        </div>
                                        <p className="rtl">به کارمندان خود ورزش هدیه کنید تا همه از مزایای آن بهره مند شوند.</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 mt-40">
                                    <div className="ab__box rtl">
                                        <div className="ab__box--head">
                                            <div className="icon icon__2">
                                                <img src="/images/icons/ab-2.png" alt="" />
                                            </div>
                                            <h4 className="title">ورزش را <br/>
                                               عادت کنید</h4>
                                        </div>
                                        <p>با ساخت تیم های ورزشی و رویداد های هفتگی ورزش کردن را برای مجموعه خود عادت کنید</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about section end -->    */}
        </>
    )
}
