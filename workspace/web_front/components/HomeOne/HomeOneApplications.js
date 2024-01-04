import React from 'react';

const HomeOneApplications = () => {
    return (
        <>
            {/* <!-- service section start --> */}
            <section className="service-area service-area__2 pt-125 pb-125 rtl">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="section-header section-header__white mb-75">
                                <h2 className="section-title section-title__2 section-title__white">اپلیکیشن های جیم پین</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-none-50">
                        <div className="col-xl-6 col-lg-6 mt-50">
                            <a className="service-item service-item__2 d-flex" href={"https://corporate.gympin.ir"}>
                                <div className="service-item__content service-item__content--2">
                                    <h4 className="service-item__title">اپلیکیشن سازمان ها</h4>
                                    <p>این اپلیکیشن ویژه به سازمان ها مزایایی از
                                        جمله بهبود مدیریت پرسنل، مدیریت مالی
                                        بهتر و شفاف تر، امکان تشویق کارمندان،
                                        کاهش هزینه های اداری، و بهبود بهره وری
                                        مالی را ارائه می دهد. این امکانات به سازمان ها
                                        کمک می کنند تا مدیریت پرسنل را بهبود
                                        بخشند و به تصمیم گیری های بهتری برسند.</p>
                                    <img src="/images/logo/gym-pwa3.jpg" alt="" />

                                </div>
                            </a>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-50">
                            <a className="service-item service-item__2 d-flex" href={"https://web.gympin.ir"}>
                                <div className="service-item__content service-item__content--2">
                                    <h4 className="service-item__title">اپلیکیشن کاربران</h4>
                                    <p>اپلیکیشن کاربران جیم پین یک ابزار کارآمد و
                                        چندمنظوره است که امکان دسترسی به مراکز
                                        ورزشی و خدمات مختلف را از طریق یک رابط
                                        کاربری آسان و متمرکز فراهم می کند. این
                                        اپلیکیشن به کاربران امکان مدیریت و استفاده
                                        از منابع و خدمات ورزشی را از طریق یک
                                        حساب کاربری تخصیصی ارائه می دهد. </p>
                                    <img src="/images/logo/gym-pwa.jpg" alt="" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- service section end -->    */}
        </>
    );
};

export default HomeOneApplications;
