import React from 'react'

export default function HomeTwoFeature() {
    return (
        <>
            {/* <!-- feature section start --> */}
            <section className="feature-area feature-area__2 grey-bg pt-125">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header mb-70">
                                <h4 className="sub-heading sub-heading__2 mb-15">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt=""/></span>
                                    core feature
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-5" alt=""/></span>
                                </h4>
                                <h2 className="section-title section-title__2">Future printing</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-none-30">
                        <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item feature-item__2">
                                <div className="feature-item__icon feature-item__icon--round bg_img"
                                    data-background="/images/shape/round-shape.png">
                                    <img src="/images/icons/f-5.png" alt=""/>
                                </div>
                                <div className="feature-item__content feature-item__content--2">
                                    <h4 className="feature-item__title feature-item__title--2">Brand Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient pot nostra tiyer an bold interect
                                        pena</p>
                                    <a href="service-details.html" className="inline-btn"><span className="icon"><i
                                        className="far fa-arrow-right"></i></span>
                                        Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item feature-item__2">
                                <div className="feature-item__icon feature-item__icon--round bg_img"
                                    style={{"background":"url(/images/shape/round-shape.png)"}}>
                                    <img src="/images/icons/f-6.png" alt=""/>
                                </div>
                                <div className="feature-item__content feature-item__content--2">
                                    <h4 className="feature-item__title feature-item__title--2">Digital Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient pot nostra tiyer an bold interect
                                        pena</p>
                                    <a href="service-details.html" className="inline-btn"><span className="icon"><i
                                        className="far fa-arrow-right"></i></span>
                                        Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 mt-30">
                            <div className="feature-item feature-item__2">
                                <div className="feature-item__icon feature-item__icon--round bg_img"
                                    data-background="/images/shape/round-shape.png">
                                    <img src="/images/icons/f-7.png" alt=""/>
                                </div>
                                <div className="feature-item__content feature-item__content--2">
                                    <h4 className="feature-item__title feature-item__title--2">Offset Printing</h4>
                                    <p>Dis duis auctor an cum vel enim felis proins parturient pot nostra tiyer an bold interect
                                        pena</p>
                                    <a href="service-details.html" className="inline-btn"><span className="icon"><i
                                        className="far fa-arrow-right"></i></span>
                                        Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- feature section end -->    */}
        </>
    )
}
