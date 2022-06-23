import React from 'react'
import Image from 'next/image'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination]);

export default function HomeOneHero() {
    const team = [
        {
            title: ["یک ثبت نام", "بی نهایت استفاده"],
            desc: "دیگر نیاز به ثبت نام در مکان های ورزشی مختلف ندارید یکبار ثبت نام کنید",
            src: "/images/banner/hp-slide-1.jpeg"
        },
        {
            title: ["تجربه بینظیر", "ورزش های جدید"],
            desc: "ورزش های مختلفی برای استفاده شما گرداوری شده است",
            src: "/images/banner/hp-slide-2.jpeg"
        }
    ];

    return (
        <>
            {/* <!-- hero start --> */}
            <section className="hero position-relative">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplaydisableoninteraction={"false"}
                    loop={true}
                    className=""
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next",
                    }}
                >
                    {team.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="hero__item">
                                <div className="container-fluid p-0">
                                    <div className="row no-gutters">
                                        <div className="col-xl-6 col-lg-7">
                                            <div className="hero__content">
                                                <h2 className="hero__title" data-animation="fadeIn" data-delay=".2s" data-duration=".5s">{item.title[0]} <br />
                                                    {item.title[1]}</h2>
                                                <p data-animation="fadeInUp" data-delay=".5s" data-duration=".7s">{item.desc}</p>
                                                <a data-animation="fadeInUp" data-delay=".7s" data-duration=".9s" href="register.html"
                                                    className="site-btn"><span className="icon"><i className="far fa-arrow-left"></i></span> ثبت نام</a>
                                                <div className="shape">
                                                    <img src="/images/shape/hero-shape.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hero__image d-flex align-self-stretch">
                                    <img src={item.src} alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
                <div className="owl-nav">
                    <div className="custom-prev owl-prev"><i className="fal fa-angle-left"></i></div>
                    <div className="custom-next owl-next"><i className="fal fa-angle-right"></i></div>
                </div>

            </section>
            {/* <!-- hero end --> */}
        </>
    )
}
