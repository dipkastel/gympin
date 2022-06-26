import React from 'react'
import VideoPopUp from '../Plugins/VideoPopup'
import { useState } from 'react'

export default function HomeTwoVideo() {
    const [isPopUp, setPopUp] = useState(false)
    return (
        <>
            {/* <!-- video area start --> */}
            <section className="video-area" id="corporate-contact">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-xl-8">
                            <div className="video__bg bg_img" style={{ "background": "url(/images/bg/quotebg-1.jpeg)" }} data-overlay="dark"
                                data-opacity="34">
                                <div className="video-container-wrap">
                                    <a onClick={setPopUp}
                                        data-rel="lightcase:myCollection" data-animation="fadeInLeft" data-delay=".1s"
                                        className="video-link pointer">
                                        <div className="video-play-wrap">
                                            <div className="video-mark">
                                                <div className="wave-pulse wave-pulse-1"></div>
                                                <div className="wave-pulse wave-pulse-2"></div>
                                            </div>
                                            <div className="video-play">
                                                <i className="fa fa-play"></i>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {isPopUp && <VideoPopUp setShow={() => setPopUp(false)} src={"//www.youtube.com/embed/4xe72U7mXNg"} />}
                        </div>
                        <div className="col-xl-4">
                            <div className="quote-wrapper">
                                <h2 className="quote-title">مشاوره رایگان</h2>
                                <div className="quote-form rtl">
                                    <form action="index.html" className="mt-none-15">
                                        <div className="form-group mt-15">
                                            <input type="text" name="Name" id="name" placeholder="نام" />
                                        </div>
                                        <div className="form-group mt-15">
                                            <input type="tel" name="Tel" id="tel" placeholder="تلفن" />
                                        </div>
                                        <div className="form-group mt-15">
                                            <textarea name="Message" id="message" placeholder="پیام"/>
                                        </div>
                                        <div className="form-group mt-15">
                                            <button type="submit" className="quote-btn"> ارسال
                                                <span className="icon"><i
                                                    className="far fa-arrow-left"/></span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- video area end -->    */}
        </>
    )
}
