import React from 'react'

export default function TeamDetailsContent() {
    return (
        <>
            {/* <!-- details content start --> */}
            <div className="details-content-area pt-125 pb-125">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="team-details__thumb d-flex align-self-stretch">
                                <img src="/images/team/team-2.jpeg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="team-details__content">
                                <h2 className="name">Raymond Archer</h2>
                                <span className="designation">Creative Designer</span>
                                <div className="bio mt-20">
                                    <h2 className="title">My Biography</h2>
                                    <p>Integer dis ads se purus sollicitudin dapibus et vivamus pharetra sit integer dictum in
                                        dise natoque an mus quis in.
                                        Facilisis inceptos nec, potenti nostra aenean lacinia varius semper ant nullam nulla
                                        primis placerat facilisis. Netus
                                        lorem rutrum arcu dignissim at sit morbi phasellus nascetur eget urna potenti cum
                                        vestibulum cras. Tempor nonummy metus
                                        lobortis. Sociis velit etiam, dapibus lectus vehicula pele llentesque cras pat fusce
                                        pharetra felis sapien varius</p>
                                </div>
                                <div className="team-info blue-bg mt-35">
                                    <div className="team-info__item">
                                        <h4 className="team-info__item--title">Phone</h4>
                                        <a href="tel:026503656325">02 (650) 365 6325</a>
                                    </div>
                                    <div className="team-info__item">
                                        <h4 className="team-info__item--title">Email</h4>
                                        <a href="mailto:raymon@gmail.com">raymon@gmail.com</a>
                                    </div>
                                    <div className="team-info__item">
                                        <h4 className="team-info__item--title">Social</h4>
                                        <div className="social-links">
                                            <a href="#0"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#0"><i className="fab fa-twitter"></i></a>
                                            <a href="#0"><i className="fab fa-pinterest-p"></i></a>
                                            <a href="#0"><i className="fab fa-linkedin-in"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-30">
                        <div className="col-xl-4">
                            <div className="sidebar grey-bg">
                                <h4 className="sidebar__title">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt=""/></span>
                                    More Service
                                </h4>
                                <ul className="sidebar__list">
                                    <li><a href="#0">Team Member <span className="icon"><i
                                        className="far fa-arrow-right"></i></span></a></li>
                                    <li><a href="#0">Raymond Archer
                                            <span class ="icon"><i class ="far fa-arrow-right"></i></span>
                                    </a>
                                    </li>
                                    <li>
                                        <a href="#0">Theodore Gabriel
                                            <span class ="icon"><i class ="far fa-arrow-right"></i></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0">Dylan Lincoln
                                            <span class ="icon"><i class ="far fa-arrow-right"></i></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0">Hudson Cahrls
                                            <span class ="icon"><i class ="far fa-arrow-right"></i></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#0">Theodore Gabriel
                                            <span class ="icon"><i class ="far fa-arrow-right"></i></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sidebar blue-bg mt-30">
                                <div className="cta-box text-center">
                                    <h2 className="cta-box__title">
                                        Need Any
                                        Help?
                                    </h2>
                                    <p>Primis dictumst class ipsum sociosqu ultricies malesada cure</p>
                                    <a href="contact.html" className="site-btn site-btn__2 mt-35"><span className="icon icon__black"><i
                                        className="far fa-arrow-right"></i></span> SEnd messgae</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="education-box">
                                <h4 className="project-details__title mb-15">Education</h4>
                                <h4 className="education-box__title">
                                    National University of Singapore
                                </h4>
                                <span>Diploma in Computer</span>
                                <p>Libero aliquam eiget rhoncus elit quis mattis tos neque ullco qua praesent interdum orce
                                    torristique aenean at dictumst
                                    velit fames molestie tristique magna socios</p>
                            </div>
                            <div className="education-box mt-25">
                                <h4 className="education-box__title">
                                    National University of Singapore
                                </h4>
                                <span>B.S.C engineering</span>
                                <p>Libero aliquam eiget rhoncus elit quis mattis tos neque ullco qua praesent interdum orce
                                    torristique aenean at dictumst
                                    velit fames molestie tristique magna socios</p>
                            </div>
                            <div className="row mt-30">
                                <div className="col-xl-12">
                                    <h4 className="project-details__title mb-60">My work Skill</h4>
                                    <div className="skill-boxs mt-none-35">
                                        <div className="skill-item mb-35">
                                            <div className="bar-title">
                                                <h4>photshop</h4>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar__1 wow slideInLeft" role="progressbar"
                                                    style={{"width":"90%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                                    data-wow-duration="1s" data-wow-delay=".5s">
                                                    <span className="number">90%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item mb-35">
                                            <div className="bar-title">
                                                <h4>Illustrator</h4>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar__2 wow slideInLeft" role="progressbar"
                                                    style={{"width":"80%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                                    data-wow-duration="1s" data-wow-delay=".5s">
                                                    <span className="number number__2">80%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item mb-35">
                                            <div className="bar-title">
                                                <h4>adobe xd</h4>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar__3 wow slideInLeft" role="progressbar"
                                                    style={{"width":"85%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                                    data-wow-duration="1s" data-wow-delay=".5s">
                                                    <span className="number number__3">85%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-0">
                                <div className="col-xl-12">
                                    <h4 className="project-details__title">My Portfolio</h4>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 d-flex mt-30">
                                    <div className="project-item">
                                        <div className="project-item__thumb project-item__thumb--big">
                                            <img src="/images/project/p-3.jpeg" alt=""/>
                                        </div>
                                        <div className="project-item__hover" data-overlay="dark" data-opacity="9">
                                            <a href="project-details.html" className="project-item__link"><i
                                                className="far fa-arrow-right"></i></a>
                                            <div className="project-item__content">
                                                <h5 className="project-item__subtitle"><span>//</span> Book Print</h5>
                                                <h4 className="project-item__title">Megazine Cover</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 d-flex mt-30">
                                    <div className="project-item">
                                        <div className="project-item__thumb project-item__thumb--big">
                                            <img src="/images/project/p-11.jpeg" alt=""/>
                                        </div>
                                        <div className="project-item__hover" data-overlay="dark" data-opacity="9">
                                            <a href="project-details.html" className="project-item__link"><i
                                                className="far fa-arrow-right"></i></a>
                                            <div className="project-item__content">
                                                <h5 className="project-item__subtitle"><span>//</span> Book Print</h5>
                                                <h4 className="project-item__title">Megazine Cover</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 d-flex mt-30">
                                    <div className="project-item">
                                        <div className="project-item__thumb project-item__thumb--big">
                                            <img src="/images/project/p-14.jpeg" alt=""/>
                                        </div>
                                        <div className="project-item__hover" data-overlay="dark" data-opacity="9">
                                            <a href="project-details.html" className="project-item__link"><i
                                                className="far fa-arrow-right"></i></a>
                                            <div className="project-item__content">
                                                <h5 className="project-item__subtitle"><span>//</span> Book Print</h5>
                                                <h4 className="project-item__title">Megazine Cover</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 d-flex mt-30">
                                    <div className="project-item">
                                        <div className="project-item__thumb project-item__thumb--big">
                                            <img src="/images/project/p-4.jpeg" alt=""/>
                                        </div>
                                        <div className="project-item__hover" data-overlay="dark" data-opacity="9">
                                            <a href="project-details.html" className="project-item__link"><i
                                                className="far fa-arrow-right"></i></a>
                                            <div className="project-item__content">
                                                <h5 className="project-item__subtitle"><span>//</span> Book Print</h5>
                                                <h4 className="project-item__title">Megazine Cover</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- details content end -->    */}
        </>
    )
}
