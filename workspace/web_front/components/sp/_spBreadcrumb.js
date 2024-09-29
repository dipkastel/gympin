import React, {useState} from 'react'
import VideoPopUp from "../Plugins/VideoPopup";

export default function _spBreadcrumb() {
    const [isPopUp, setPopUp] = useState(false)
    return (
        <>
            {/* <!-- breadcrumb section start --> */}

            <section className="video-area video-area__3 bg_img" style={{ "backgroundImage": "url(/images/sp/sp-bg.jpg)" }}
                     data-overlay="dark" data-opacity="6">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="section-header mb-65">
                                <h2 className="section-title section-title__2 section-title__white rtl" >
                                    با جیم پین، به راحتی به شرکت‌ها و سازمان‌ها خدمات ارائه دهید.
                                </h2>
                                <a href="#contact" className="site-btn site-btn__2 mt-40"><span className="icon"><i
                                    className="far fa-arrow-left"></i></span> درخواست عضویت</a>
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
                            {isPopUp && <VideoPopUp setShow={() => setPopUp(false)} src={"/videos/gympin-p.mp4"} />}
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- breadcrumb section end --> */}
        </>
    )
}
