import React from 'react'

export default function AboutWCU() {
    return (
        <>
            {/* <!-- wcu area start --> */}
            <section className="wcu-area wcu-area__2 pt-125 pb-125">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-5 pr-0">
                            <div className="about__bg about__bg--3" data-tilt data-tilt-perspective="3000">
                                <img src="/images/bg/about-bg-1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="section-header section-header__wcu mb-50">
                                <h4 className="sub-heading sub-heading__2 sub-heading__red mb-15">
                                    why choose us
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-5" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2 mb-30">Print mindfully
                                    Green Printing</h2>
                                <p>Libero aliquam eiget rhoncus elit quis mattis tos neque ullco qua prae sent interdum orce
                                    torristique aenean at dictumst
                                    velit fames molestie tristique mage sociosqu rhoncu cubilia</p>
                            </div>
                            <div className="wcu-box__wrapper wcu-box__wrapper--2">
                                <div className="wcu-box wcu-box__2">
                                    <div className="wcu-box__icon wcu-box__icon--2">
                                        <img src="/images/icons/w-c-3.png" alt="" />
                                    </div>
                                    <div className="wcu-box__content wcu-box__content--2">
                                        <h4 className="wcu-box__title wcu-box__title--2">Satisfied Service</h4>
                                        <p>Pulvinar primis to velit dolo sociise apten acuise maner platea one more dames pura
                                            tole
                                            suspen</p>
                                    </div>
                                </div>
                                <div className="wcu-box wcu-box__2 mt-40">
                                    <div className="wcu-box__icon wcu-box__icon--2 wcu-box__icon--red">
                                        <img src="/images/icons/w-c-4.png" alt="" />
                                    </div>
                                    <div className="wcu-box__content wcu-box__content--2">
                                        <h4 className="wcu-box__title wcu-box__title--2">Free Consultancy</h4>
                                        <p>Pulvinar primis to velit dolo sociise apten acuise maner platea one more dames pura
                                            tole
                                            suspen</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- wcu area end --> */}
        </>
    )
}
