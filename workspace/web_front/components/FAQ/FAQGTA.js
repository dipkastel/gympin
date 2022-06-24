import React from 'react'

export default function FAQGTA() {
    return (
        <>
            {/* <!-- gta section start --> */}
            <section className="gta-area grey-bg pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div id="contact-map"></div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50">
                                <h4 className="sub-heading sub-heading__2 mb-15">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-10" alt="" /></span>
                                        سوال دیگری دارید
                                </h4>
                                <h2 className="section-title section-title__2">با ما در ارتباط باشید</h2>
                            </div>
                            <div className="contact-form rtl">
                                <form action="#" method="POST" id="contact-form">
                                    <div className="form-group mt-25">
                                        <input type="text" name="name" id="name" placeholder="نام شما" />
                                    </div>
                                    <div className="form-group mt-25">
                                        <input type="email" name="email" id="mail" placeholder="ایمیل" />
                                    </div>
                                    <div className="form-group mt-25">
                                        <textarea name="message" id="message" placeholder="سوال خود را بنویسید"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__s2 mt-15 ltr"><span className="icon icon__black"><i
                                        className="far fa-arrow-left"></i></span> ارسال</button>
                                    <p className="ajax-response"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- gta section end -->    */}
        </>
    )
}
