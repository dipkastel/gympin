import React from 'react'
import Link from 'next/link'

export default function AboutBreadcrumb() {
    return (
        <>
            {/* <!-- breadcrumb section start --> */}
            <section className="breadcrumb-section pt-180 pb-180 bg_img" style={{"backgroundImage":"url(/images/bg/breadcrumb-bg-1.jpeg)"}} data-overlay="dark" data-opacity="3">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 d-flex">
                            <div className="breadcrumb-text">
                                <h2 className="breadcrumb-text__title">
                                    برند جیم پین
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
