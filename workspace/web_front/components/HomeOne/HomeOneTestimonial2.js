import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation]);

export default function HomeOneTestimonial2() {
    return (
        <>
            {/* <!-- testimonial area start --> */}

            <div className="testimonial-area testimonial-area__2 testimonial-area__3  pt-50 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="testimonial__3 owl-carousel text-center position-relative">

                                        <div className="testimonial-item">
                                            <div className="testimonial__2--icon mb-70">
                                                <img src="/images/logo/android-chrome-192x192bw.png" alt="" />
                                            </div>
                                            <div className="testimonial__2--content testimonial__2--content--2 rtl">
                                                <p>جیم پین یک کسب و کار برای ارتباط بین شرکت ها و مراکز
                                                    ورزشی است . جیم پین به طور خاص ، به منظور
                                                    مدیریت خدمات ورزشی و سلامت کارکنان در سازمان ها و شرکت
                                                    ها طراحی شده است.
                                                </p><p>
                                                    ما در جیم پین به فروش خدمات و
                                                    رزرو مراکز ورزشی به صورت آنلاین برای پرسنل شرکت ها و
                                                    سازمان ها اهتمام داریم.
                                                </p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- testimonial area end -->    */}
        </>
    )
}
