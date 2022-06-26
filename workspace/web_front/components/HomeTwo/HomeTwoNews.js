import React from 'react'

export default function HomeTwoNews() {
    return (
        <>
         {/* <!-- news section start --> */}
    <section className="news-area news-area__2 pt-125 pb-125 rtl">
        <div className="container">
            <div className="row">
                <div className="col-xl-7">
                    <div className="section-header">
                        <h4 className="sub-heading sub-heading__2 mb-10">خبر شرکت ها</h4>
                        <h2 className="section-title section-title__2">آخرین خبر ها</h2>
                    </div>
                </div>
                <div className="col-xl-5 text-right news-right">
                    <a href="news.html" className="inline-btn">
                        بیشتر
                        <span className="icon"><i className="far fa-arrow-left"/></span></a>
                </div>
            </div>
            <div className="row mt-none-30">
                <div className="col-xl-6 col-lg-12 mt-30">
                    <article className="post-box">
                        <div className="post-box__thumb post-box__thumb--2">
                            <img src="/images/news/news-4.jpg" alt=""/>
                        </div>
                        <div
                            className="post-box__content post-box__content--2 post-box__content--grey post-box__content--white  pl-45 pr-45">
                            <a href="news-details.html" className="date-author">شرکت ها / 26 خرداد 1401</a>
                            <h4 className="post-box__title post-box__title--2">
                                <a href="news-details.html">شرکت های بزرگ به جیم پین پیوستند</a>
                            </h4>
                            <div className="post-box__excerpt">
                                <p>خبر ها نشان میدهد شرکت های بزرگ برای همکاری با این مجموعه اشتیاق بالایی نشان میدهند ....</p>
                            </div>
                            <a href="news-details.html" className="inline-btn mt-0">
                                مطالعه مطلب
                                <span className="icon"><i className="far fa-arrow-left"/></span>
                            </a>
                        </div>
                    </article>
                </div>
                <div className="col-xl-6">
                    <article className="post-box">
                        <div className="row reverse-col flex-xs-column-reverse mt-30">
                            <div className="col-xl-6 col-lg-6 my-auto">
                                <div className="post-box__content post-box__content--2 post-box__content--white p-0">
                                    <a href="news-details.html" className="date-author">شرکت ها / 22 خرداد 1401</a>
                                    <h4 className="post-box__title post-box__title--2">
                                        <a href="news-details.html">عضویت بیش از 100 مجموعه</a>
                                    </h4>
                                    <div className="post-box__excerpt">
                                        <p>جیم پین طی 10 روز بیش از 100 مجموعه را به پلتفرم خود اضافه کرد که این موضوع باعت افزایش استقبال کاربران از این ....</p>
                                    </div>
                                    <a href="news-details.html" className="inline-btn">
                                        مطالعه مطلب
                                        <span className="icon"><i className="far fa-arrow-left"/></span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="post-box__thumb post-box__thumb--2">
                                    <img src="/images/news/news-5.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="post-box">
                        <div className="row mt-30">
                            <div className="col-xl-6 col-lg-6">
                                <div className="post-box__thumb post-box__thumb--2">
                                    <img src="/images/news/news-6.jpg" alt=""/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 my-auto">
                                <div className="post-box__content post-box__content--2 post-box__content--white p-0">
                                    <a href="news-details.html" className="date-author">همه / 12 خرداد 1401</a>
                                    <h4 className="post-box__title post-box__title--2">
                                        <a href="news-details.html">شروع فعالیت جیم پین</a>
                                    </h4>
                                    <div className="post-box__excerpt">
                                        <p>جیم پین پس از 1 سال تلاش فعالیت خود را شروع کرد . مجموعه جیم پین که طی سال گذشته در تلاش برای ساخت محصول و آماده سازی جهت ورود به بازار بود ....</p>
                                    </div>
                                    <a href="news-details.html" className="inline-btn">
                                        مطالعه مطلب
                                        <span className="icon"><i className="far fa-arrow-left"/></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- news section end -->    */}
        </>
    )
}
