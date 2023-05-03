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
            sub:"سوال",
            title:"جیم پین چیست؟",
            text:"جیم پین، پلتفرمی برای ارتباط بین مراکز ورزشی و شرکت‌هاست. با جیم پین، شرکت‌ها می‌توانند به کارمندانشان دسترسی به مراکز ورزشی بدهند و همچنین مراکز ورزشی می‌توانند مشتریان جدید داشته باشند",
            userName:"و سازمان ها شادابتر خواهند بود",
            position:"مراکز با جیم پین عضو جدید میگیرند",
            src: "/images/other/author-1.png"
        },
        {
            sub:"اطلاعات",
            title:"ترافیک مجموعه؟",
            text: "جیم پین این امکان را فراهم کرده تا شما قبل از ورود به مراکز از وضعیت شلوغی آن مرکز مطلع شوید و بتوانید ورزش لذت بخشتری را تجربه کنید . کیف پول جیم پین به شما این امکان را میدهد تا دیگر برای خرید پلن های ورزشی دست به کارت هم نشوید ",
            userName:"",
            position:"",
            src: "/images/other/traffic.jpg"
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
                                            <h4 className="sub-heading sub-heading__white mb-10">{item.sub}</h4>
                                            <h2 className="section-title section-title__white">{item.title}</h2>
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
                                                    <h4 className="name mt-80">{item.userName} <span className="designation">{item.position}</span></h4>
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
