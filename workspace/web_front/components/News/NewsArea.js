import React, { useState } from 'react'
import VideoPopUp from '../../components/Plugins/VideoPopup'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, {Navigation, EffectFade} from 'swiper';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, EffectFade]);

export default function NewsArea() {
    const [isPopUp, setPopUp] = useState(false)
    return (
        <>
            {/* <!-- news area start --> */}
            <div className="blog__area blog__area--2 pt-125 pb-125">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            <article className="blog__box blog__box--3 blog__box--image mb-40">
                                <div className="thumb">
                                    <a href="news-details.html">
                                        <img src="/images/news/news-list-1.jpeg" alt="blog image" />
                                    </a>
                                </div>
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">Lorem ipsum dolor sit amet, consecte
                                            cing elit, sed do eiusmod tempor.</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="post-text mb-35">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis
                                            aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore.</p>
                                    </div>
                                    <div className="post-bottom mt-30">
                                        <div className="authore">
                                            <img src="/images/news/news-list-authore.png" alt="" />
                                            <span>by Hetmayar</span>
                                        </div>
                                        <a href="news-details.html" className="inline-btn"><span className="icon"><i
                                            className="fal fa-arrow-right"></i></span> Read
                                            More</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--video mb-40">
                                <div className="thumb">
                                    <a onClick={setPopUp} href="news-details.html">
                                        <img src="/images/news/news-list-2.jpeg" alt="blog image" />
                                    </a>
                                    <a onClick={setPopUp} href="//www.youtube.com/embed/4xe72U7mXNg?rel=0&amp;controls=0&amp;showinfo=0"
                                        data-rel="lightcase:myCollection" data-animation="fadeInLeft" data-delay=".1s"
                                        className="video-link">
                                        <div className="video-play-wrap">
                                            <div className="video-mark">
                                                <div className="wave-pulse wave-pulse-1"></div>
                                                <div className="wave-pulse wave-pulse-2"></div>
                                            </div>
                                            <div className="video-play">
                                                <i className="fa fa-play"></i>
                                            </div>
                                        </div>
                                    </a>
                                    {isPopUp && <VideoPopUp setShow={() => setPopUp(false)} src={"https://www.youtube.com/embed/4xe72U7mXNg"} />}
                                </div>
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">Adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore.</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="post-text mb-35">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis
                                            aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore.</p>
                                    </div>
                                    <div className="post-bottom mt-30">
                                        <div className="authore">
                                            <img src="/images/news/news-list-authore.png" alt="" />
                                            <span>by Hetmayar</span>
                                        </div>
                                        <a href="news-details.html" className="inline-btn"><span className="icon"><i
                                            className="fal fa-arrow-right"></i></span> Read
                                            More</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--gallery mb-40">
                                <div className="post_gallery owl-carousel position-relative">
                                    <Swiper
                                        spaceBetween={2}
                                        slidesPerView={1}
                                        autoplaydisableoninteraction={"false"}
                                        autoplay={{
                                            "delay": 3000,
                                            "disableOnInteraction": false
                                          }}
                                         loop={true}
                                         effect={"fade"}
                                         fadeEffect= {{
                                            crossFade: true
                                          }}
                                        className="custom-class"
                                        navigation={{
                                            prevEl: ".custom-prev",
                                            nextEl: ".custom-next",
                                        }}
                                    >

                                        <SwiperSlide>
                                            <div className="single-postbox-gallery">
                                                <img src="/images/news/news-list-3.jpeg" alt="blog image" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-postbox-gallery">
                                                <img src="/images/news/news-list-2.jpeg" alt="blog image" />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="pixen-nav">
                                        <div className="pixen-prev custom-prev"><i className="fal fa-arrow-left"></i></div>
                                        <div className="pixen-next custom-next"><i className="fal fa-arrow-right"></i></div>
                                    </div>
                                </div>
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">Magna aliqua.Ut enim ad minim venia
                                            m, quis nostrud exercitation ullamco</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="post-text mb-35">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et
                                            dolore magna
                                            aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo
                                            consequat.Duis
                                            aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore.</p>
                                    </div>
                                    <div className="post-bottom mt-30">
                                        <div className="authore">
                                            <img src="/images/news/news-list-authore.png" alt="" />
                                            <span>by Hetmayar</span>
                                        </div>
                                        <a href="news-details.html" className="inline-btn"><span className="icon"><i
                                            className="fal fa-arrow-right"></i></span> Read
                                            More</a>
                                    </div>


                                </div>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--audio mb-40">
                                <div className="postbox_audio embed-responsive embed-responsive-16by9">
                                    <iframe style={{ "height": "450px" }} className="w-100"
                                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/469608615&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">

                                    </iframe>
                                </div>
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">Laboris nisi ut aliquip ex ea commodo
                                            consequat.Duis aute irure dolor.</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="post-text mb-35">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et
                                            dolore magna
                                            aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo
                                            consequat.Duis
                                            aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore.</p>
                                    </div>
                                    <div className="post-bottom mt-30">
                                        <div className="authore">
                                            <img src="/images/news/news-list-authore.png" alt="" />
                                            <span>by Hetmayar</span>
                                        </div>
                                        <a href="news-details.html" className="inline-btn"><span className="icon"><i
                                            className="fal fa-arrow-right"></i></span> Read
                                            More</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--text mb-40">
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">In reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur.</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="post-text mb-35">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et
                                            dolore magna
                                            aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo
                                            consequat.Duis
                                            aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore.</p>
                                    </div>
                                    <div className="post-bottom">
                                        <div className="authore">
                                            <img src="/images/news/news-list-authore.png" alt="" />
                                            <span>by Hetmayar</span>
                                        </div>
                                        <a href="news-details.html" className="inline-btn"><span className="icon"><i
                                            className="fal fa-arrow-right"></i></span> Read
                                            More</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--quote mb-40">
                                <blockquote>
                                    <h3 className="title">
                                        <a href="news-details.html">Excepteur sint occaecat cupida
                                            tat non proident, sunt in.</a>
                                    </h3>
                                    <div className="meta mt-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 23 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                    <div className="quote-icon">
                                        <img src="/images/icons/quote-icon.png" alt="" />
                                    </div>
                                </blockquote>
                            </article>
                            <article className="blog__box blog__box--3 blog__box--transparent bg_img"
                                data-background="/images/news/news-list-4.jpeg" data-overlay="light" data-opacity="7">
                                <div className="content pt-50">
                                    <div className="cat">
                                        <span>Businese</span>
                                    </div>
                                    <h3 className="title">
                                        <a href="news-details.html">Culpa qui officia deserunt mollit anim
                                            id est laborum.Sed ut perspiciatis</a>
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-eye"></i> 232 Views </span>
                                        <span><a href="#0"><i className="far fa-comments"></i> 35 Comments</a></span>
                                        <span><a href="#0"><i className="far fa-calendar-alt"></i> 24th March 2019</a></span>
                                    </div>
                                </div>
                            </article>
                            <div className="blog__pagination mt-40">
                                <ul>
                                    <li><a href="#0"><i className="fas fa-angle-double-left"></i></a></li>
                                    <li><a href="#0">01</a></li>
                                    <li className="active"><a href="#0">02</a></li>
                                    <li><a href="#0">03</a></li>
                                    <li><a href="#0"><i className="fas fa-ellipsis-h"></i></a></li>
                                    <li><a href="#0"><i className="fas fa-angle-double-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12">
                            <div className="sidebar-wrap">
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        About Me
                                    </h4>
                                    <div className="aboutme text-center">
                                        <img src="/images/news/news-author-2.jpeg" alt="" />
                                        <h4>Rosalina D.Willaimson</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore.</p>
                                        <div className="aboutme__icon mt-30">
                                            <a href="#0"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#0"><i className="fab fa-twitter"></i></a>
                                            <a href="#0"><i className="fab fa-behance"></i></a>
                                            <a href="#0"><i className="fab fa-linkedin-in"></i></a>
                                            <a href="#0"><i className="fab fa-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Search Objects
                                    </h4>
                                    <form className="sidebar-search-form">
                                        <input type="text" placeholder="Search your keyword..." />
                                        <button type="submit"><i className="fas fa-search"></i></button>
                                    </form>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Popular Feeds
                                    </h4>
                                    <ul className="recent-posts">
                                        <li>
                                            <div className="thumb">
                                                <a href="blog-details.html"><img
                                                    src="/images/news/news-releted-post-1.jpeg" alt="" /></a>
                                            </div>
                                            <div className="content">
                                                <h6 className="title"><a href="news-details.html">Lorem ipsum dolor sit
                                                    cing elit, sed do.</a></h6>
                                                <div className="meta"> 24th March 2019</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thumb">
                                                <a href="blog-details.html"><img
                                                    src="/images/news/news-releted-post-2.jpeg" alt="" /></a>
                                            </div>
                                            <div className="content">
                                                <h6 className="title"><a href="news-details.html">Lorem ipsum dolor sit
                                                    cing elit, sed do.</a></h6>
                                                <div className="meta"> 24th March 2019</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thumb">
                                                <a href="blog-details.html"><img
                                                    src="/images/news/news-releted-post-3.jpeg" alt="" /></a>
                                            </div>
                                            <div className="content">
                                                <h6 className="title"><a href="news-details.html">Lorem ipsum dolor sit
                                                    cing elit, sed do.</a></h6>
                                                <div className="meta"> 24th March 2019</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thumb">
                                                <a href="blog-details.html"><img
                                                    src="/images/news/news-releted-post-4.jpeg" alt="" /></a>
                                            </div>
                                            <div className="content">
                                                <h6 className="title"><a href="news-details.html">Lorem ipsum dolor sit
                                                    cing elit, sed do.</a></h6>
                                                <div className="meta"> 24th March 2019</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Categories
                                    </h4>
                                    <ul className="sidebar__list">
                                        <li>
                                            <a href="service-details.html">Banner Printing
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">Billboard Printing
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">Business Card
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">Poster Printing
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">Poster Printing
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">T-Shirt Printing
                                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Never Miss News
                                    </h4>
                                    <div className="social__links">
                                        <a href="#0"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#0"><i className="fab fa-twitter"></i></a>
                                        <a href="#0"><i className="fab fa-pinterest-p"></i></a>
                                        <a href="#0"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Twitter Feeds
                                    </h4>
                                    <ul className="twitter__feeds">
                                        <li>
                                            <div className="t-feed-icon">
                                                <i className="fab fa-twitter"></i>
                                            </div>
                                            <div className="t-feed-body">
                                                <p>Rescue - #Gutenberg ready @wordpress
                                                    Theme for Creative Bloggers available on
                                                    @ThemeForest https://t.co/2r1POjOjgV
                                                    C… https://t.co/rDAnPyClu1</p>
                                                <div className="t-feed-meta"> November 25, 2018</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="t-feed-icon">
                                                <i className="fab fa-twitter"></i>
                                            </div>
                                            <div className="t-feed-body">
                                                <p>Rescue - #Gutenberg ready @wordpress
                                                    Theme for Creative Bloggers available on
                                                    @ThemeForest https://t.co/2r1POjOjgV
                                                    C… https://t.co/rDAnPyClu1</p>
                                                <div className="t-feed-meta"> November 25, 2018</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="t-feed-icon">
                                                <i className="fab fa-twitter"></i>
                                            </div>
                                            <div className="t-feed-body">
                                                <p>Rescue - #Gutenberg ready @wordpress
                                                    Theme for Creative Bloggers available on
                                                    @ThemeForest https://t.co/2r1POjOjgV
                                                    C… https://t.co/rDAnPyClu1</p>
                                                <div className="t-feed-meta"> November 25, 2018</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Instagram Feeds
                                    </h4>
                                    <ul id="Instafeed">
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-1.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-2.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-3.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-4.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-5.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-6.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-7.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-8.jpeg" alt="" /></a>
                                        </li>
                                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-9.jpeg" alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                        Popular Tags
                                    </h4>
                                    <div className="tag">
                                        <a href="#0" className="site-btn">Popular</a>
                                        <a href="#0" className="site-btn">desgin</a>
                                        <a href="#0" className="site-btn">ux</a>
                                        <a href="#0" className="site-btn">usability</a>
                                        <a href="#0" className="site-btn">develop</a>
                                        <a href="#0" className="site-btn">icon</a>
                                        <a href="#0" className="site-btn">business</a>
                                        <a href="#0" className="site-btn">consult</a>
                                        <a href="#0" className="site-btn">kit</a>
                                        <a href="#0" className="site-btn">keyboard</a>
                                        <a href="#0" className="site-btn">mouse</a>
                                        <a href="#0" className="site-btn">tech</a>
                                    </div>
                                </div>
                                <div className="widget sidebar grey-bg ad__widget">
                                    <img src="/images/bg/news-ad-banner.jpeg" alt="" />
                                    <div className="ad-text">
                                        <h3><span>350x600</span>Add Banner</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- news area end -->    */}
        </>
    )
}
