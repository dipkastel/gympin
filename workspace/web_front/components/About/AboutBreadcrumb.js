import React from 'react'
import Link from 'next/link'

export default function AboutBreadcrumb() {
    return (
        <>
            {/* <!-- breadcrumb section start --> */}
            <section className="breadcrumb-section pt-180 pb-180 bg_img" style={{"backgroundImage":"url(/images/banner/front-banner_about.jpg)"}} data-overlay="dark" data-opacity="3">
                <div className="container rtl">
                    <div className="row">
                        <div className="col-xl-5 d-flex">
                            <div className="breadcrumb-text">
                                <h2 className="breadcrumb-text__title">
                                    درباره ما
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {/* <!-- breadcrumb section end --> */}
        </>
    )
}
