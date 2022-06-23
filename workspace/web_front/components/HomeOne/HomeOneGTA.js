import React from 'react'
import GoogleMap from '../Plugins/GoogleMap/GoogleMap'

export default function HomeOneGTA() {
    return (
        <>
            {/* <!-- gta section start --> */}
            <section className="gta-area pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div>
                                <GoogleMap/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50">
                                <h4 className="sub-heading mb-15">قدم آخر</h4>
                                <h2 className="section-title">یک پیام بگذار</h2>
                            </div>
                            <div className="contact-form">
                                <form action="#" method="POST" id="contact-form">
                                    <div className="form-group mt-25 rtl">
                                        <input type="text" name="name" id="name" placeholder="نام"/>
                                    </div>
                                    <div className="form-group mt-25 rtl">
                                        <input type="email" name="email" id="mail" placeholder="شماره تماس"/>
                                    </div>
                                    <div className="form-group mt-25 rtl">
                                        <textarea name="message" id="message" placeholder="پیام"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__s2 mt-15"><span className="icon icon__black"><i
                                        className="far fa-arrow-left"></i></span>
                                        ثبت</button>
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
