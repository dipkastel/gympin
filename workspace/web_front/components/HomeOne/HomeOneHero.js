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
            title: ["ورزش بیشتر", "شادابی بیشتر"],
            desc: "پلتفرم خدمات ورزشی ویژه سازمان ها",
            src: "/images/banner/front-banner5.jpg",
            destination:"https://corporate.gympin.ir/auth/register",
            btnTitle:"ثبت رایگان"
        },
        {
            title: [ "مناسب با بودجه","سازمان شما"],
            desc: "روش های مختلف و متنوع پرداخت ",
            src: "/images/banner/front-banner7.jpg",
            destination:"https://gympin.ir/corporate",
            btnTitle:"اطلاعات بیشتر"
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
                                                <h2 className="hero__title text-shadow"  data-animation="fadeIn" data-delay=".2s" data-duration=".5s">{item.title[0]} <br />
                                                    {item.title[1]}</h2>
                                                <p className="text-shadow" data-animation="fadeInUp" data-delay=".5s" data-duration=".7s">{item.desc}</p>
                                                <a data-animation="fadeInUp" data-delay=".7s" data-duration=".9s" href={item.destination}
                                                    className="site-btn"><span className="icon"><i className="far fa-arrow-left"></i></span>{item.btnTitle}</a>

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
                {/*<div className="owl-nav">*/}
                {/*    <div className="custom-prev owl-prev"><i className="fal fa-angle-left"></i></div>*/}
                {/*    <div className="custom-next owl-next"><i className="fal fa-angle-right"></i></div>*/}
                {/*</div>*/}

            </section>
            {/* <!-- hero end --> */}
        </>
    )
}
