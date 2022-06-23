import React from 'react'

export default function HomeOneNews() {

    const news = [
        {
            title: "اکنون میتوانید با عضویت متوسط از بولینگ هم استفاده کنید",
            auther:"شهرام سماواتی",
            category:"ورزش ها",
            date:Date(),
            src: "/images/news/news-1.jpeg"
        },
        {
            title: "شرکت مادر تخصصی بتن سرزمین پارس به جیم پین پیوست",
            auther:"سارا سلواتی",
            category:"شرکت ها",
            date:Date(),
            src: "/images/news/news-2.jpeg"
        },
        {
            title: "میانگین ورزش ایرانیان کمتر از 2 دقیقه است + تصویر",
            auther:"مبینا کارگر",
            category:"سلامتی",
            date:Date(),
            src: "/images/news/news-3.jpeg"
        }
    ];
    return (
        <>
            {/* <!-- news section start --> */}
            <section className="news-area grey-bg pt-120 pb-120">
                <div className="container">
                    <div className="row rtl" >
                        <div className="col-xl-7">
                            <div className="section-header mb-80">
                                <h4 className="sub-heading mb-10">آخرین مقالات</h4>
                                <h2 className="section-title">اتاق خبر جیم پین</h2>
                            </div>
                        </div>
                        <div className="col-xl-5 text-right news-right">
                            <a href="news.html" className="inline-btn">
                                مطالعه اخبار
                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                            </a>
                        </div>
                    </div>
                    <div className="row mt-none-30">

                        {news.map((item, i) => (

                            <div className="col-xl-4 col-lg-6 mt-30" key={i}>
                                <article className="post-box">
                                    <div className="post-box__thumb">
                                        <img src={item.src} alt=""/>
                                        <span className="post-box__cat">{item.category}</span>
                                    </div>
                                    <div className="post-box__content text-center">
                                        <a href="news-details.html" className="date-author">{item.auther} / {(new Date(item.date)).getHours()}:{(new Date(item.date)).getMinutes()}</a>
                                        <h4 className="post-box__title">
                                            <a href="news-details.html">{item.title}</a>
                                        </h4>
                                        <a href="news-details.html" className="inline-btn">
                                            <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            ادامه مطلب
                                        </a>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- news section end -->    */}
        </>
    )
}
