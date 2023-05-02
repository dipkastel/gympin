import React from 'react'

export default function HomeTwoHero() {
    return (
        <>
            {/* <!-- hero start --> */}
            <section className="hero__2 bg_img" style={{ "background": "url(/images/banner/hero-banner-2.jpg)" }}>
                <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className="col-xl-5 custom-col-width justify-content-end col-lg-7">
                            <div className="hero__content hero__content--2 text-center">
                                <div className="hero-icon">
                                    <img src="/images/icons/hero-icon.png" alt="" />
                                </div>
                                <div className="hero-text">
                                    <h2>همکارانی پر انرژی <br />
                                        در محیطی پویا</h2>
                                    <p>هدف شما اولویت ماست</p>
                                    <a href="#corporate-contact" className="site-btn site-btn__2"><span className="icon"><i
                                        className="far fa-arrow-left"/></span> مشاوره</a>
                                </div>
                                <div className="dot-shape"><img src="/images/shape/hero-pattern-2.png" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shape-pattern">
                    <img src="/images/shape/hero-pattern-1.png" alt="" />
                </div>
            </section>
            {/* <!-- hero end -->    */}
        </>
    )
}
