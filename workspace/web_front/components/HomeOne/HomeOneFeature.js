import React from 'react'

export default function HomeOneFeature() {
    return (
        <>
            {/* <!-- feature section start --> */}
            <section className="feature-area pt-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header mb-50">
                                <h2 className="section-title">اپلیکیشن‌های جیم‌پین</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-none-30">
                        <a href={"https://corporate.gympin.ir"} className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                برای شرکت ها
                                <img src="/images/logo/gym-pwa3.jpg" alt="" />
                            </div>
                        </a>
                        <a href={"https://place.gympin.ir"} className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                برای مراکز
                                <img src="/images/logo/gym-pwa2.jpg" alt="" />
                            </div>
                        </a>
                        <a href={"https://web.gympin.ir"} className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                آی او اس
                                <img src="/images/logo/gym-pwa-ioss.jpg" alt="" />
                            </div>
                        </a>
                        <a href={"/download"} className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                اندروید
                                <img src="/images/logo/gym-pwa-and.jpg" alt="" />
                            </div>
                        </a>

                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="/images/logo/sibapp-badge-white.png" alt="" />
                                به زودی
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="/images/logo/iApps.png" alt="" />
                                به زودی
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="/images/logo/google-play-badge.png" alt="" />
                                به زودی
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="/images/logo/bazaar.png" alt="" />
                                به زودی
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- feature section end -->   */}
        </>
    )
}
