import React from 'react'

export default function ContactGTA() {
    return (
        <>
            {/* <!-- gta section start --> */}
            <section className="gta-area gta-area__2 pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            {/*<div className="gta-bg__2">*/}
                            {/*    <img src="/images/bg/gta-bg-2.png" alt=""/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="col-xl-6 pl-50">
                            <div className="section-header mb-50">
                                <h2 className="section-title section-title__2">پیامی بگذارید</h2>
                            </div>
                            <div className="contact-form">
                                <form action="#" method="POST" id="contact-form">
                                    <div className="form-group mt-25">
                                        <input className={"rtl"} type="text" name="name" id="name" placeholder="نام"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <input  className={"rtl"} type="tel" name="tel" id="tel" placeholder="تلفن"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <textarea  className={"rtl"} name="message" id="message" placeholder="پیام"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__2 mt-15"><span className="icon icon__black"><i
                                        className="far fa-arrow-left"></i></span> ارسال</button>
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
