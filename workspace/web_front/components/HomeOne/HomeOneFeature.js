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
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="https://web-cdn.snapp.ir/snapp-website/images/homepage/markets/iApps.png" alt="" />
                                به زودی
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="https://web-cdn.snapp.ir/snapp-website/images/homepage/markets/sibapp-badge-white.png" alt="" />
                                به زودی
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="https://web-cdn.snapp.ir/snapp-website/images/homepage/markets/google-play-badge.png" alt="" />
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6  col-sm-6 col-6 mt-30">
                            <div className="feature-item">
                                <img src="https://web-cdn.snapp.ir/snapp-website/images/homepage/markets/bazaar.png" alt="" />
                                   <br/>
                                   <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- feature section end -->   */}
        </>
    )
}
