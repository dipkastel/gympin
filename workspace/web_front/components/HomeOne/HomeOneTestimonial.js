import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination]);

export default function HomeOneTestimonial() {
    const team = [
        {
            text:"من تا الان هفته ای 2 روز ورزش میکردم چون ورزش کردن من نیاز داشت حتما نزدیک خونه باشم تا بتونم برم باشگاه از وفتی با جیم پین آشنا شدم ساک باشگاه پشت ماشینمه و فقط کافیه 2 ساعت وقت خالی پیدا کنم هرجا باشم یه باشگاه نزدیک پیدا میکنم و تموم.ورزش کردن برام مثل آب خوردن شده اصلا فکرشم نمی کردم همچین چیزی امکان پذیر باشه دمتون گرم",
            userName:"ساسان دهقان",
            position:"مدیر, شرکت داستا",
            src: "/images/other/author-1.png"
        },
        {
            text: "تبریک میگم انتخاب خوبی کردی بهترین میان رده سال 2021 (از هر نظر) و سال 2022 (از نظر قیمت) پیشاپیش مبارکت باشه داداش\n" +
                "البته باتری بهتر میخوای a73 (که بهترین میان رده سال 2022) هست ولی احتمالا هزینشو نداری که اینو انتخاب میکنی رفیق این گوشی درحال حاضر هیچ مشکلی از هیچ نظر نداره با گارانتی داریا همراه از نمایندگی بگیری دیگه خیالتم راحت\n" +
                "خیر ضعیف تر نشده خیالت راحت من که به شخصه به مشکلی برنخوردم رفقای دیگه اگه برخوردن بگن",
            userName:"فرهاد میرباقری",
            position:"برنامه نویس, شرکت رونیچ",
            src: "/images/other/author-2.png"
        }
    ];
    return (
        <>
            {/* <!-- testimonial section start --> */}
            <div className="testimonial-area theme-bg  pt-155 pb-155">
                <span className="shape shape__1">
                    <img src="/images/shape/t-line-1.png" alt="" />
                </span>
                <span className="shape shape__2">
                    <img src="/images/shape/t-line-2.png" alt="" />
                </span>
                <div className="container">
                    <Swiper
                        spaceBetween={2}
                        slidesPerView={1}
                        autoplaydisableoninteraction={"false"}
                        loop={true}
                        pagination={{ clickable: true }}
                        className="custom-class"
                        navigation={{
                            prevEl: ".custom-prev",
                            nextEl: ".custom-next",
                        }}
                    >

                        {team.map((item, i) => (

                            <SwiperSlide key={i}>
                                <div className="row justify-content-end">
                                    <div className="col-xl-7 col-lg-8">
                                        <div className="section-header mb-10">
                                            <h4 className="sub-heading sub-heading__white mb-10">گفت و گو</h4>
                                            <h2 className="section-title section-title__white">نظر کاربران جیم پین</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="testimonial py-5">

                                            <div className="testimonial-item">
                                                <div className="testimonial-item__thumb">
                                                <span className="t-shape">
                                                    <img src="/images/shape/border-shape.png" alt="" />
                                                </span>
                                                    <div className="author">
                                                        <img src={item.src} alt="" />
                                                    </div>
                                                    <span className="quote"><img src="/images/icons/t-quote.png" alt="" /></span>
                                                </div>
                                                <div className="testimonial-item__content">
                                                    <p>
                                                        {item.text}
                                                    </p>
                                                    <h4 className="name mt-40">{item.userName} - <span className="designation">{item.position}</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* <!-- testimonial section end -->    */}
        </>
    )
}
