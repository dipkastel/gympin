import React from 'react'

export default function ServiceStrategy() {
    return (
        <>
            {/* <!-- strategy section start --> */}
            <div className="strategy-section pb-125">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="strategy_bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/bg/strategy-bg-1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 pl-60">
                            <div className="section-header section-header__2 mb-75">
                                <h4 className="sub-heading sub-heading__2 mb-10">
                                    our strategy
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-10" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2 mb-30">Energy quality
                                    Commitment</h2>
                                <p>Libero aliquam eiget rhoncus elit quis mattis tose neque ullco quality praesent interdum orce
                                    torristique aenean atest
                                    dictumst velit fames molestie tristique magna sociosqu</p>
                            </div>
                            <div className="skill-boxs mt-none-35">
                                <div className="skill-item mb-35">
                                    <div className="bar-title">
                                        <h4>Digital print</h4>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar__1 wow slideInLeft" role="progressbar"
                                            style={{"width":"90%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s"
                                            data-wow-delay=".5s">
                                            <span className="number">90%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skill-item mb-35">
                                    <div className="bar-title">
                                        <h4>Brand print</h4>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar__2 wow slideInLeft" role="progressbar"
                                            style={{"width":"80%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s"
                                            data-wow-delay=".5s">
                                            <span className="number number__2">80%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skill-item mb-35">
                                    <div className="bar-title">
                                        <h4>offset print</h4>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar__3 wow slideInLeft" role="progressbar"
                                            style={{"width":"85%","visibility":"visible","animationDuration":"1s","animationDelay":"0.5s","animationName":"slideInLeft"}}
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s"
                                            data-wow-delay=".5s">
                                            <span className="number number__3">85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- strategy section end -->    */}
        </>
    )
}
