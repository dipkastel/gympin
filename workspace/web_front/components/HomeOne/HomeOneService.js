import React from 'react'

export default function HomeOneService() {
    return (
        <>
         {/* <!-- service section start --> */}
    <section className="service-area pt-125 pb-125">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 text-center">
                    <div className="section-header mb-75">
                        <h4 className="sub-heading mb-25">
                            <span><img src="/images/shape/heading-shape-1.png" className="mr-10" alt=""/></span>
                            خدمات ما
                            <span><img src="/images/shape/heading-shape-2.png" className="ml-10" alt=""/></span>
                        </h4>
                        <h2 className="section-title">سلامتی بی حد و اندازه</h2>
                    </div>
                </div>
            </div>
            <div className="row mt-none-50">
                <div className="col-xl-6 col-lg-6 mt-50">
                    <div className="service-item d-flex">
                        <div className="service-item__icon service-item__icon--1">
                            <img src="/images/icons/s-1.png" alt=""/>
                        </div>
                        <div className="service-item__content">
                            <h4 className="service-item__title">گستردگی ورزش ها</h4>
                            <p>از میان 30 ورزش که توسط بیش از 150 مرکز ورزشی ارائه شده است انتخاب کنید</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 mt-50">
                    <div className="service-item d-flex">
                        <div className="service-item__icon service-item__icon--2">
                            <img src="/images/icons/s-2.png" alt=""/>
                        </div>
                        <div className="service-item__content">
                            <h4 className="service-item__title">پوشش ورزش های جدید</h4>
                            <p>شما هرگز خسته نخواهید شد .ما هر روز ورزش های جدیدی ارائه میکنیم</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xl-8 text-center">
                    <div className="view-all mt-55">
                        <p>ما به شما کمک میکنیم شرکت با نشاط تری داشته باشید. <a href="/corporate">برای شرکت ها</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- service section end -->    */}
        </>
    )
}
