import React from 'react'

export default function HomeOneFeature() {
    return (
        <>
            {/* <!-- feature section start --> */}
            <section className="feature-area pt-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header mb-50">
                                <h4 className="sub-heading mb-25">
                                    <span><img src="/images/shape/heading-shape-1.png" className="mr-5" alt="" /></span>
                                    Company Feature
                                    <span><img src="/images/shape/heading-shape-2.png" className="ml-5" alt="" /></span>
                                </h4>
                                <h2 className="section-title">Digital Printing</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-none-30">
                        <div className="col-xl-3 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item">
                                <div className="feature-item__icon feature-item__icon--1">
                                    <img src="/images/icons/f-1.png" alt="" />
                                </div>
                                <div className="feature-item__content">
                                    <h4 className="feature-item__title">Digital Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient port nostra penas</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item">
                                <div className="feature-item__icon feature-item__icon--2">
                                    <img src="/images/icons/f-2.png" alt="" />
                                </div>
                                <div className="feature-item__content">
                                    <h4 className="feature-item__title">Brand Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient port nostra penas</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item">
                                <div className="feature-item__icon feature-item__icon--3">
                                    <img src="/images/icons/f-3.png" alt="" />
                                </div>
                                <div className="feature-item__content">
                                    <h4 className="feature-item__title">3d Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient port nostra penas</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item">
                                <div className="feature-item__icon feature-item__icon--4">
                                    <img src="/images/icons/f-4.png" alt="" />
                                </div>
                                <div className="feature-item__content">
                                    <h4 className="feature-item__title">Offset Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient port nostra penas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- feature section end -->   */}
        </>
    )
}
