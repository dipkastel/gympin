import React from 'react';

const BlogSidebar = () => {
    return (
        <div className="col-xl-4 col-lg-12">
            <div className="sidebar-wrap">
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        جستجو در مطالب
                    </h4>
                    <form className="sidebar-search-form">
                        <input type="text" placeholder="... جستجو" />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        مطالب دیگر
                    </h4>
                    <ul className="recent-posts rtl">
                        {/*repeat*/}
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
                        {/*-repeat*/}
                    </ul>
                </div>
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        دسته بندی ها
                    </h4>
                    <ul className="sidebar__list">
                        {/*repeat*/}
                        <li>
                            <a href="service-details.html">Banner Printing
                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                            </a>
                        </li>
                        {/*-repeat*/}
                    </ul>
                </div>
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        توييتر
                    </h4>
                    <ul className="twitter__feeds">
                        {/*repeat*/}
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
                        {/*-repeat*/}
                    </ul>
                </div>
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        اينستاگرام
                    </h4>
                    <ul id="Instafeed">
                        {/*repeat*/}
                        <li><a href="#0"><img src="/images/news/instafeed/insta-feed-1.jpeg" alt="" /></a>
                        </li>
                        {/*-repeat*/}
                    </ul>
                </div>
                <div className="widget sidebar grey-bg mb-40">
                    <h4 className="sidebar__title mb-30">
                        <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                        تگ مطالب
                    </h4>
                    <div className="tag">

                        {/*repeat*/}
                        <a href="#0" className="site-btn">Popular</a>
                        {/*-repeat*/}
                    </div>
                </div>
                {/*<div className="widget sidebar grey-bg ad__widget">*/}
                {/*    <img src="/images/bg/news-ad-banner.jpeg" alt="" />*/}
                {/*    <div className="ad-text">*/}
                {/*        <h3><span>350x600</span>Add Banner</h3>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default BlogSidebar;
