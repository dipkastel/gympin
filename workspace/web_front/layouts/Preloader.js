import React from 'react'

export default function Preloader() {
    return (
        <>
            {/* <!-- preloader  --> */}
            <div id="preloader">
                <div id="ctn-preloader" className="ctn-preloader">
                    <div className="animation-preloader">
                        <div className="spinner"></div>
                        <div className="txt-loading">
                            <span data-text-preloader="P" className="letters-loading">
                                P
                            </span>
                            <span data-text-preloader="I" className="letters-loading">
                                I
                            </span>
                            <span data-text-preloader="X" className="letters-loading">
                                X
                            </span>
                            <span data-text-preloader="E" className="letters-loading">
                                E
                            </span>
                            <span data-text-preloader="N" className="letters-loading">
                                N
                            </span>
                        </div>
                    </div>
                    <div className="loader">
                        <div className="row">
                            <div className="col-3 loader-section section-left">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-left">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-right">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-right">
                                <div className="bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- preloader end --> */}

        </>
    )
}
