import React from 'react'
import { useState } from 'react'
import VideoPopUp from '../Plugins/VideoPopup'

export default function TeamVideo() {
    const [isPopUp, setPopUp] = useState(false)
    return (
        <>
            {/* <!-- video area start --> */}
            <section className="video-area video-area__3 bg_img" style={{ "backgroundImage": "url(/images/bg/vide-bg-2.jpeg)" }}
                data-overlay="dark" data-opacity="6">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="section-header mb-65">
                                <h4 className="sub-heading sub-heading__2 sub-heading__white mb-15">
                                    Printing Work
                                    <span><img src="/images/shape/heading-shape-5.png" className="ml-5" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2 section-title__white">Every single
                                    beneficial thing
                                    printed</h2>
                                <a href="about.html" className="site-btn site-btn__2 mt-40"><span className="icon"><i
                                    className="far fa-arrow-right"></i></span> read more</a>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="video-container-wrap video-container-wrap__3 text-center">
                                <a onClick={setPopUp}
                                    data-rel="lightcase:myCollection" data-animation="fadeInLeft" data-delay=".1s"
                                    className="video-link video-link__3 pointer">
                                    <div className="video-play-wrap video-play-wrap__3">
                                        <div className="video-mark video-mark__3">
                                            <div className="wave-pulse wave-pulse-1"></div>
                                            <div className="wave-pulse wave-pulse-2"></div>
                                        </div>
                                        <div className="video-play video-play__3">
                                            <i className="fa fa-play"></i>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {isPopUp && <VideoPopUp setShow={() => setPopUp(false)} src={"//www.youtube.com/embed/4xe72U7mXNg"} />}
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- video area end -->    */}
        </>
    )
}
