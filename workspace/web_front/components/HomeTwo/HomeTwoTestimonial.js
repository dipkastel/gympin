import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation]);

export default function HomeTwoTestimonial() {
    return (
        <>
            {/* <!-- testimonial area start --> */}
            <div className="testimonial-area testimonial-area__2 pt-130 pb-130 grey-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="testimonial__2 owl-carousel text-center position-relative">
                                <Swiper
                                    spaceBetween={2}
                                    slidesPerView={1}
                                    autoplaydisableoninteraction={"false"}
                                    loop={true}
                                    className="custom-class"
                                    navigation={{
                                        prevEl: ".custom-prev",
                                        nextEl: ".custom-next",
                                    }}
                                    // scrollbar={{ draggable: true }}
                                >

                                    <SwiperSlide>
                                        <div className="testimonial-item">
                                            <div className="testimonial__2--icon mb-70">
                                                <img src="/images/icons/t-quote-2.png" alt="" />
                                            </div>
                                            <div className="testimonial__2--content">
                                                <p>Lorem ipsum dolor site amet consectetur adipisice
                                                    usmods tempor incididunt uter labore etere dolore magna aliqua enim ad minim veniam
                                                    quis nostrud exercitation
                                                    ule lamco
                                                    lris nisi ut aliquip ex ea commodo consequ rure dolor reprehende in voluptate</p>
                                            </div>
                                            <div className="testimonial__2--author mt-55">
                                                <div className="thumb">
                                                    <img src="/images/other/author-2.png" alt="" />
                                                </div>
                                                <div className="content">
                                                    <h4 className="name">Marina D. Lucator</h4>
                                                    <span className="designation">Project Manager</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="testimonial-item">
                                            <div className="testimonial__2--icon mb-70">
                                                <img src="/images/icons/t-quote-2.png" alt="" />
                                            </div>
                                            <div className="testimonial__2--content">
                                                <p>Lorem ipsum dolor site amet consectetur adipisice
                                                    usmods tempor incididunt uter labore etere dolore magna aliqua enim ad minim veniam
                                                    quis nostrud exercitation
                                                    ule lamco
                                                    lris nisi ut aliquip ex ea commodo consequ rure dolor reprehende in voluptate</p>
                                            </div>
                                            <div className="testimonial__2--author mt-55">
                                                <div className="thumb">
                                                    <img src="/images/other/author-2.png" alt="" />
                                                </div>
                                                <div className="content">
                                                    <h4 className="name">Marina D. Lucator</h4>
                                                    <span className="designation">Project Manager</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="owl-nav">
                                    <div className="owl-prev custom-prev"><i className="fal fa-long-arrow-left"></i></div>
                                    <div className="owl-next custom-next"><i className="fal fa-long-arrow-right"></i></div>
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
