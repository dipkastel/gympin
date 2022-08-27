import React, { useState } from 'react'

export default function HomeOneFAQ() {
    const [activeDefault, setActiveDefault] = useState(0);
    const FAQ = [
        {
            q: "مراکز ورزشی چرا و چگونه باید خود را در اپلیکیشن جیم پین ثبت کنند ؟",
            a:"دلایل و راه های متفاوتی برای ثبت مراکز ورزشی در جیم پین وجود دارد فرم مربوط در همین صفحه را پرکنید و یا یک پیام برای ما بگذارید تا کارشناسان جیم پین با شما تماس بگیرند."
        },
        {
            q: "شرکت ها چگونه میتوانند کارمندان خود را در اپلیکشن ثبت نام کنند ؟",
            a:"در بخش شرکت ها کامل به این موضوع پرداخته شده است فرم را پرکنید و یا با ما تماس بگیرید."
        },
        {
            q: "آیا جیم پین کلاس های ورزشی آنلاین هم برگزار میکند ؟",
            a:"رسالت جیم پین ارائه راهکار های ورزشی است . و هم اکنون در زمینه رزرو و خرید بلیت مراکز فعالیت می کند. جیم پین محدودیتی برای نوع فعالیت ورزشی ندارد و اگر فعالیت های آنلاین ورزشی توسط مجموعه ها ارائه شود در بخش ورزش ها فابل مشاهده خواهد بود."
        },
        {
            q: "آیا جیم پین برای استفاده کاربران هزینه دریافت میکند ؟",
            a:"خیر ، جیم پین هیچ هزینه ای برای خدمات خود از کاربر دریافت نمیکند و پرداختی کاربران تنها مربوط به خدماتی است که دریافت خواهند نمود"
        }

    ]
    return (
        <>
            {/* <!-- faq section start --> */}
            <section className="faq-area pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="section-header mb-25">
                                <h4 className="sub-heading mb-15">سوالات متداول</h4>
                                <h2 className="section-title">پرسش های شما</h2>
                            </div>
                            <div className="accordion faqs" id="accordionFaq">
                                {FAQ.map((d, i) => (
                                    <div className="card" key={i}>
                                        <div onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className="card__header" id="heading1">
                                            <h5 className="mb-0 title">
                                                <button onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className={activeDefault === i ? "btn btn-link collapsed" : "btn btn-link"} type="button" data-toggle="collapse"
                                                    data-target="#collapse1" aria-expanded={activeDefault === i ?"true" :"false"} aria-controls="collapse1">
                                                   {d.q}
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse1" className={`collapse ${activeDefault === i ? "show" : ""}`} aria-labelledby="heading1" data-parent="#accordionFaq">
                                            <div className="card__body">
                                                <p>{d.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="faq-bg">
                                <img src="/images/bg/faq-bg-1.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- faq section end -->    */}
        </>
    )
}
