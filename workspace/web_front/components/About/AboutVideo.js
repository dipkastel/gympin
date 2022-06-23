import React from 'react'
import VideoPopUp from '../Plugins/VideoPopup'
import { useState } from 'react'

export default function AboutVideo() {
    const [isPopUp, setPopUp] = useState(false)
    return (
        <>
            {/* <!-- video area start --> */}
            <div className="video-area video-area__2">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="video__bg video__bg--2 bg_img" style={{ "backgroundImage": "url(/images/bg/video-bg-1.jpeg)" }}
                                data-overlay="dark" data-opacity="5">
                                <div className="video-container-wrap video-container-wrap__2">
                                    <a onClick={setPopUp}
                                        data-rel="lightcase:myCollection" data-animation="fadeInLeft" data-delay=".1s"
                                        className="video-link video-link__2 pointer">
                                        <div className="video-play-wrap video-play-wrap__2">
                                            <div className="video-mark video-mark__2">
                                                <div className="wave-pulse wave-pulse-1"></div>
                                                <div className="wave-pulse wave-pulse-2"></div>
                                            </div>
                                            <div className="video-play video-play__2">
                                                <i className="fa fa-play"></i>
                                            </div>
                                        </div>
                                    </a>
                                    <a onClick={setPopUp} className="video-text video-text__2 pointer"
                                        data-rel="lightcase:myCollection" data-animation="fadeInLeft" data-delay=".1s">Play
                                        Intro Video</a>

                                </div>
                            </div>
                            {isPopUp && <VideoPopUp setShow={() => setPopUp(false)} src={"//www.youtube.com/embed/4xe72U7mXNg"} />}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- video area end --> */}
        </>
    )
}
