import React from 'react'

export default function Section404() {
    return (
        <>
            <section className="pt-125 pb-125">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header mb-80">
                                <h4 className="sub-heading sub-heading__2 mb-25">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-10" alt="" /></span>
                                    متاسفانه صفحه مورد نظر یافت نشد
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-10" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2 mt-35">خطا 404</h2>
                                <h4 className="heading mb-25 mt-65">
                                   شاید جستجو در میان
                                    <a href="/venues"> مراکز و ورزش ها </a>
                                    کمک کننده باشد
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- pricing section end -->    */}
        </>
    )
}
