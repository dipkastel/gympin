import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination]);

export default function ProjectBrand() {
    return (
        <>
            {/* <!-- brand section start --> */}
            <div className="brand-section pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="brand-carousel owl-carousel">
                                <Swiper
                                    spaceBetween={2}
                                    slidesPerView={2}
                                    autoplaydisableoninteraction={"false"}
                                    loop={true}
                                    breakpoints={{

                                    // when window width is >= 768px
                                    576: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        // when window width is >= 992px
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        // when window width is >= 992px
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        // when window width is >= 992px
                                        slidesPerView: 5,
                                    }
                                }}
                                    
                                >

                                    <SwiperSlide>
                                        <div className="brand-carousel__item">
                                            <img className="default" src="/images/brand/brand-1.png" alt="" />
                                            <img className="hover" src="/images/brand/brand-1-h.png" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="brand-carousel__item">
                                            <img className="default" src="/images/brand/brand-2.png" alt="" />
                                            <img className="hover" src="/images/brand/brand-2-h.png" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="brand-carousel__item">
                                            <img className="default" src="/images/brand/brand-3.png" alt="" />
                                            <img className="hover" src="/images/brand/brand-3-h.png" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="brand-carousel__item">
                                            <img className="default" src="/images/brand/brand-4.png" alt="" />
                                            <img className="hover" src="/images/brand/brand-4-h.png" alt="" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="brand-carousel__item">
                                            <img className="default" src="/images/brand/brand-5.png" alt="" />
                                            <img className="hover" src="/images/brand/brand-5-h.png" alt="" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- brand section end -->    */}
        </>
    )
}
