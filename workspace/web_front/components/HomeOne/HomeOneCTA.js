import React from 'react'

export default function HomeOneCTA() {
    return (
        <>
            {/* <!-- cta section start --> */}
            <section className="cta-area theme-bg pt-105 pb-115">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="section-header">
                                <h2 className="section-title section-title__white">برای شرکت نیازمند<br/>
                                    راه کارهای ورزشی هستید؟</h2>
                            </div>
                        </div>
                        <div className="col-xl-4 text-right">
                            <div className="cta-right">
                                <p>با ما تماس بگیرید</p>
                                <a href="contact.html" className="site-btn site-btn__s3">
                                    <span className="icon"><i className="far fa-arrow-left"></i></span>
                                    تماس با ما
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- cta section end -->    */}
        </>
    )
}
