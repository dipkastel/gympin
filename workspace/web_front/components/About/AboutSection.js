import React from 'react'

export default function AboutSection() {
    return (
        <>
            {/* <!-- about section start --> */}
            <section className="about-area pt-125 pb-125">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-5">
                            <div className="about__bg about__bg--2 mt-75">
                                <div className="big-thumb">
                                    <img src="/images/about/about-bg-1.jpeg" alt="" />
                                </div>
                                <div className="mid-thumb position-absulate">
                                    <img src="/images/about/about-bg-2.jpeg" alt="" />
                                </div>
                                <div className="small-thumb position-absulate">
                                    <img src="/images/about/about-bg-3.jpeg" alt="" />
                                </div>
                                <span className="circle-shape position-absulate"><img src="/images/shape/border-shape-2.png" alt="" /></span>
                                <span className="patternt-shape position-absulate"><img src="/images/shape/about-shape-1.png" alt="" /></span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="section-header section-header__2 mb-40">
                                <h4 className="sub-heading sub-heading__2 mb-10">About Us <span><img
                                    src="/images/shape/heading-shape-4.png" className="ml-10" alt="" /></span></h4>
                                <h2 className="section-title section-title__2 mb-30">From Structure
                                    to Conveyance</h2>
                                <p>Libero aliquam eiget rhoncus elit quis mattis tos neque ullco qua praesent interdum orce
                                    torristique aenean at dictumst
                                    velit fames molestie tristique magna sociosqu iner rhoncuis in cubilia here are some best
                                    and
                                    catchy dolor for printing
                                    company</p>
                            </div>
                            <div className="row mt-none-40">
                                <div className="col-xl-6 mt-40">
                                    <div className="ab__box">
                                        <div className="ab__box--head">
                                            <div className="icon">
                                                <img src="/images/icons/ab-1.png" alt="" />
                                            </div>
                                            <h4 className="title">Get the <br />
                                                Most Definitely</h4>
                                        </div>
                                        <p>Pulvinar primis to velit dolo sociise aptent varius acuise maner platea dames pura
                                            suspen
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-6 mt-40">
                                    <div className="ab__box">
                                        <div className="ab__box--head">
                                            <div className="icon icon__2">
                                                <img src="/images/icons/ab-2.png" alt="" />
                                            </div>
                                            <h4 className="title">Fast and <br />
                                                quality service</h4>
                                        </div>
                                        <p>Pulvinar primis to velit dolo sociise aptent varius acuise maner platea dames pura
                                            suspen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="ab-author-signature mt-55">
                                <div className="author__box">
                                    <div className="author__box--thumb">
                                        <img src="/images/other/author-2.png" alt="" />
                                    </div>
                                    <div className="author__box--text">
                                        <h4 className="name">Martyn Alex</h4>
                                        <span className="designation">CEO of pixen</span>
                                    </div>
                                </div>
                                <div className="signature">
                                    <img src="/images/shape/signature.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about section end --> */}
        </>
    )
}
