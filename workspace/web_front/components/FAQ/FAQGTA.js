import React from 'react'

export default function FAQGTA() {
    return (
        <>
            {/* <!-- gta section start --> */}
            <section className="gta-area grey-bg pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div id="contact-map"></div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50">
                                <h4 className="sub-heading sub-heading__2 mb-15">Send Message
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-10" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2">Get in Touch</h2>
                            </div>
                            <div className="contact-form">
                                <form action="#" method="POST" id="contact-form">
                                    <div className="form-group mt-25">
                                        <input type="text" name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group mt-25">
                                        <input type="email" name="email" id="mail" placeholder="Email Address" />
                                    </div>
                                    <div className="form-group mt-25">
                                        <textarea name="message" id="message" placeholder="Your Message"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__s2 mt-15"><span className="icon icon__black"><i
                                        className="far fa-arrow-right"></i></span> Contact us</button>
                                    <p className="ajax-response"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- gta section end -->    */}
        </>
    )
}
