import React from 'react'

export default function HomeTwoAbout() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section className="about-area pt-85 pb-125">
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
                                <h2 className="section-title section-title__2 mb-30">با جیم پین سلامتی را به سازمان خود هدیه دهید</h2>
                                <p className="rtl">فرهنگ سازمانی خود را با ورزش متحول کنید .</p>
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
                                            <h4 className="title">دسترسی به مراکز <br/> ورزشی و تفریحی</h4>
                                        </div>
                                        <p className="rtl">شما میتوانید پرسنل و کارمندانتان را با افزودن دسترسی و شارژ اعتبار تشویق کنید</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 mt-40">
                                    <div className="ab__box rtl">
                                        <div className="ab__box--head">
                                            <div className="icon icon__2">
                                                <img src="/images/icons/ab-2.png" alt="" />
                                            </div>
                                            <h4 className="title">هزینه های خود را<br/>
                                               هوشمند مدیریت کنید</h4>
                                        </div>
                                        <p>جیم پین مدل پرداختی را ایجاد کرده که بتوانید هزینه های خود را به صورت هوشمند مدیریت کنید و از صرف هزینه های اضافی بکاهید</p>
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
