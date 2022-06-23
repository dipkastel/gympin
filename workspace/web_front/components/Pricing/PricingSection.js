import React from 'react'

export default function PricingSection() {
    return (
        <>
            {/* <!-- pricing section start --> */}
            <section className="pricing-area pt-125 pb-125">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header mb-80">
                                <h4 className="sub-heading sub-heading__2 mb-25">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-10" alt="" /></span>
                                    affordable price
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-10" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2">Pricing Package</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-none-30">
                        <div className="col-xl-4 col-lg-6 mt-30">
                            <div className="pricing-item">
                                <div className="pricing-item__head">
                                    <h2 className="heading-title">Standard</h2>
                                    <h4 className="sub-heading-title">Regular Price</h4>
                                </div>
                                <div className="pricing-item__price">
                                    <h2>$50.00</h2>
                                </div>
                                <ul className="pricing-item__lists">
                                    <li>Living aboves saying</li>
                                    <li>Evening a gather</li>
                                    <li>Waters move replenish</li>
                                    <li>Lesser land replenis</li>
                                    <li>Bear morn divide divided</li>
                                    <li>Under beginning</li>
                                </ul>
                                <a href="pricing.html" className="price-btn">
                                    <span className="icon"><i className="far fa-arrow-right"></i></span>
                                    select plan
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 mt-30">
                            <div className="pricing-item">
                                <div className="pricing-item__head">
                                    <h2 className="heading-title">Business</h2>
                                    <h4 className="sub-heading-title">Regular Price</h4>
                                </div>
                                <div className="pricing-item__price">
                                    <h2>$60.00</h2>
                                </div>
                                <ul className="pricing-item__lists">
                                    <li>Living aboves saying</li>
                                    <li>Evening a gather</li>
                                    <li>Waters move replenish</li>
                                    <li>Lesser land replenis</li>
                                    <li>Bear morn divide divided</li>
                                    <li>Under beginning</li>
                                </ul>
                                <a href="pricing.html" className="price-btn">
                                    <span className="icon"><i className="far fa-arrow-right"></i></span>
                                    select plan
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 mt-30">
                            <div className="pricing-item">
                                <div className="pricing-item__head">
                                    <h2 className="heading-title">Premium</h2>
                                    <h4 className="sub-heading-title">Regular Price</h4>
                                </div>
                                <div className="pricing-item__price">
                                    <h2>$70.00</h2>
                                </div>
                                <ul className="pricing-item__lists">
                                    <li>Living aboves saying</li>
                                    <li>Evening a gather</li>
                                    <li>Waters move replenish</li>
                                    <li>Lesser land replenis</li>
                                    <li>Bear morn divide divided</li>
                                    <li>Under beginning</li>
                                </ul>
                                <a href="pricing.html" className="price-btn">
                                    <span className="icon"><i className="far fa-arrow-right"></i></span>
                                    select plan
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- pricing section end -->    */}
        </>
    )
}
